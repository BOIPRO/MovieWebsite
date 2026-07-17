export default function Loading() {
    return (
        <div className="max-w-[1350px] mx-auto p-2 animate-pulse space-y-6">
            {/* Skeleton cho InfoAnime */}
            <div className="flex flex-col px-2 items-center md:items-start md:flex-row gap-6 bg-black rounded-2xl border border-white/5 p-6">
                {/* Ảnh bìa */}
                <div className="w-[40%] md:w-[280px] aspect-[3/4] bg-neutral-600 rounded-xl"></div>

                {/* Nội dung bên phải */}
                <div className="flex-1 flex flex-col gap-4 w-full text-center md:text-left">
                    <div className="space-y-2">
                        <div className="h-8 md:h-10 w-3/4 bg-neutral-600 rounded mx-auto md:mx-0"></div>
                        <div className="h-4 w-1/2 bg-neutral-600 rounded mx-auto md:mx-0"></div>
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">
                        <div className="h-8 w-24 bg-neutral-600 rounded-full"></div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => <div key={i} className="h-6 w-16 bg-neutral-600 rounded-md"></div>)}
                        </div>
                    </div>
                    <div className="space-y-2 px-2 md:px-0">
                        <div className="h-4 w-full bg-neutral-600 rounded"></div>
                        <div className="h-4 w-full bg-neutral-600 rounded"></div>
                        <div className="h-4 w-[85%] bg-neutral-600 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Skeleton cho ListEpsiodes (giả định là grid button) */}
            <div className="space-y-4 px-2">
                <div className="h-6 w-32 bg-neutral-600 rounded"></div>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 gap-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-10 w-full bg-neutral-600 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}