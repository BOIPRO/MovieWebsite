export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0b0e14] flex flex-col justify-center items-center z-[9999]">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-transparent via-cyan-400 to-blue-600 p-[3px] animate-spin">
          <div className="w-full h-full bg-[#0b0e14] rounded-full"></div>
        </div>
      </div>
      <p className="mt-6 text-sm font-medium tracking-[0.25em] text-slate-400 uppercase animate-pulse select-none">
        B Movie <span className="text-blue-500">Loading...</span>
      </p>
    </div>
  );
}