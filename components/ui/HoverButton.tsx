import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HoverButtonInverted() {
  return (
    <div className="flex items-center justify-start">
      <button 
        className=" 
          group relative flex items-center justify-center 
          h-12 w-12 xl:h-8 xl:w-8  hover:w-34 
          bg-zinc-800 hover:bg-zinc-700
          hover:cursor-pointer
          text-white border border-zinc-700/50 rounded-full 
          transition-all duration-300 ease-in-out 
          overflow-hidden select-none
        "
      >
        {/* Phần chữ: Ban đầu ẩn (opacity-0), hover mới hiện (opacity-100) */}
        <span 
          className="
            absolute left-5 text-sm font-medium whitespace-nowrap
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 delay-100 ease-in
          "
        >
          Xem thêm
        </span>

        {/* Phần Icon Font Awesome: Ban đầu nằm căn giữa, khi hover dịch sang phải */}
        <span 
          className="
            absolute 
            left-1/2 -translate-x-1/2 
            group-hover:left-auto group-hover:right-5 group-hover:translate-x-0
            transition-all duration-300 ease-in-out 
            flex items-center justify-center
          "
        >
            <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </button>
    </div>
  );
}