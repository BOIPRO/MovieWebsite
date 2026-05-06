import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) return new Response("Missing URL", { status: 400 });

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://storage.googleapiscdn.com/player/1f94b5e30bfa07c84b528026f7d952b7453077df872119feb2d79cd140bd84b2?nextName=003&nextUrl=https%3A%2F%2Fanimevietsub.bz%2Fphim%2Fone-piece-dao-hai-tac-a1%2Ftap-003-37.html',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
      },
    });

    const contentType = response.headers.get('Content-Type') || '';

    if (targetUrl.includes('.m3u8') || contentType.includes('mpegurl') || contentType.includes('application/x-mpegURL')) {
      let content = await response.text();
      const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1);

      const fixedContent = content.replace(/^(?!#)(.*)$/gm, (match) => {
        const line = match.trim();
        if (line === '') return line;

        const absoluteUrl = line.startsWith('http') ? line : baseUrl + line;

        return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
      });

      return new Response(fixedContent, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }
    // xu li MP4
    const rangeHeader = request.headers.get('range');
    const videoResponse = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://www.animesaturn.cx/watch?file=6vso7vSFrOHgk',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:144.0) Gecko/20100101 Firefox/144.0',
        'Range': rangeHeader || '', // Cực kỳ quan trọng để tua phim
      },
    });
    return new Response(videoResponse.body, {
  status: videoResponse.status, // Trả về 206 (Partial Content) nếu tua
  headers: {
    'Content-Type': videoResponse.headers.get('Content-Type') || 'video/mp4',
    'Access-Control-Allow-Origin': '*',
    'Accept-Ranges': 'bytes', // Báo cho trình duyệt là "Tôi cho phép tua đấy!"
    'Content-Length': videoResponse.headers.get('Content-Length') || '',
    'Content-Range': videoResponse.headers.get('Content-Range') || '',
  },});
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response("Proxy Error", { status: 502 });
  }
}