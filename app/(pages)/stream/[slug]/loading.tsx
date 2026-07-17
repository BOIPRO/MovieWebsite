export default function Loading() {
  return (
   <div className='max-w-[1350px] mx-auto animate-pulse text-[16px]'>
      <div className='gap-2 xl:flex xl:h-[500px]'>
        <div className='w-full xl:w-[70%] h-[300px] xl:h-[500px] bg-neutral-600 rounded-lg'></div>
        
        {/* Skeleton cho ListEpisodes */}
        <div className='w-full xl:w-[30%] h-[500px] bg-black rounded-lg p-4 space-y-3'>
          <div className="h-6 w-1/3  text-white bg-black rounded">Danh sách tập</div> {/* Title list */}
          <div className="grid grid-cols-5 gap-3">
                  {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-neutral-600 rounded"></div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}