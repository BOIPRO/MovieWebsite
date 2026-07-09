"use client"
import { useEffect, useRef, useState } from 'react';
import Hls from "hls.js";
import SliceData from '@/lib/services/decryptseg'
interface Prop {
    m3u8: string
}
class PNGTsLoader {
    private loader: any;

    constructor(config: any) {
        const HlsConstructor = Hls as any;
        // Sử dụng loader mặc định của hls.js để thực hiện việc fetch thực tế
        this.loader = new HlsConstructor.DefaultConfig.loader(config);
    }

    // Các phương thức bắt buộc để thỏa mãn interface của Hls.js
    destroy() {
        this.loader.destroy();
    }

    abort() {
        this.loader.abort();
    }

    get context() {
        return this.loader.context;
    }

    get stats() {
        return this.loader.stats;
    }

    load(context: any, config: any, callbacks: any) {

        if (context.type === 'manifest') {
            this.loader.load(context, config, callbacks);
            return;
        }
        const customCallbacks = {
            ...callbacks,
            onSuccess: (response: any, stats: any, context: any, networkDetails: any) => {
                context.type = 'fragment';
                const rawBuffer = response.data;
                const cleanTsData = SliceData(rawBuffer);
                const modifiedResponse = {
                    ...response,
                    data: cleanTsData
                };

                callbacks.onSuccess(modifiedResponse, stats, context, networkDetails);
            }
        };

        this.loader.load(context, config, customCallbacks);
    }
}
export default function VideoPlayer({ m3u8 }: Prop) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    useEffect(() => {
        if (!m3u8 || !videoRef.current) return;
        const blob = new Blob([m3u8], { type: 'application/vnd.apple.mpegurl' });
        const blobUrl = URL.createObjectURL(blob);
        if (!blobUrl || !videoRef.current) return;
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }
        const video = videoRef.current;
        const hls = new Hls({
            loader: PNGTsLoader as any,
            debug: false,
            maxBufferLength: 60,
            // Tăng ngưỡng buffer bắt buộc trước khi phát để tránh giật
            maxMaxBufferLength: 300,
            // Tăng tốc độ tải dữ liệu
            maxBufferSize: 60 * 1024 * 1024, // 60MB

        });
        hls.loadSource(blobUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                console.error("Lỗi nghiêm trọng, đang khởi động lại HLS...", data);
                hls.destroy();
                // Có thể thêm logic tự động reload hoặc báo lỗi ở đây
            }
        });
        return () => {
            hls.stopLoad();
            hls.destroy();
            URL.revokeObjectURL(blobUrl);
        };
    }, [m3u8]);

    return <video ref={videoRef} className='flex-[2] w-full h-full ' controls playsInline />

}