import Image from 'next/image'
const Footer = () => {
  return (
    <div className="text-white/80 max-w-[1350px] mx-auto">
      <div className=" mt-5">
        <div className='flex items-center border-b max-w-[150px]'>
          <Image
            src="/icons/BMovie.svg"
            alt="BMovie Logo"
            width={0}
            height={0}
            style={{ width: '75px', height: 'auto' }} />
          <p className="text-[16px] font-bold tracking-tight">
            BMovie
          </p>
        </div>
        <div className="py-2">
          <p>Developer : BoiDev</p>
          <p>Web xem anime tuyệt vời với tính năng cập nhật hàng giờ. Mang đến trải nghiệm tối ưu nhất khi xem phim</p>
        </div>
      </div>
    </div>
  )
}

export default Footer