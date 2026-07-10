# BMovie - Nền tảng xem phim tối ưu hóa hiệu năng tích hợp nhiều nguồn
## Overview
Mang đến những bộ phim chất lượng cho người xem
## Tech Stack
Nextjs có sử dụng tailwindCSS ,AniList GraphQL API
## Engineering Highlights
SEO Optimization : Tối ưu hóa cấu trúc url với slug-based routing
Autocomplete : Công cụ tìm kiếm tích hợp autocomplete nâng cao trải nghiệm người dùng
Custom Loader : xây dựng hàm giải mã trong loader để phát video an toàn, nâng cao việc bảo vệ m3u8 
## Cấu trúc route
/home               (Banner và một số bộ phim nổi tiếng)
/info               (Thông tin của một bộ phim và danh sách tập)
/stream             (Nơi phát video)
/anime-pho-bien     (danh sách anime phổ biến)
/anime-trong-nam    (danh sách anime trong năm)
/search             (danh sách anime tìm kiếm)
/login              (đăng nhập)
/register           (đăng kí)
## Giải thích kiến trúc
/home  -- Lấy banner, 10 bộ nổi tiếng nhất hiện tại, 10 bộ cập nhật gần nhất, 10 bộ nổi tiếng trong năm hiện tại và 10 bộ nổi tiếng nhất thời đại. Dung ISR để cập nhât từ API mỗi 600s vừa đạt hiệu suất gần giống page tĩnh
/info  -- lấy thông tin phim và danh sách tập phim thông qua id trên route, thực hiện cache bên server nextjs để tối ưu tốc độ và giảm truy vấn api
/stream  -- nơi phát video theo tập đã chọn,lấy slug của bộ phim và id trên route để truy vấn
/anime-pho-bien  --  Lấy danh sách các aniem phổ biến theo kiểu pagination cũ được sắp xếp theo đô phổ biến của phim
/anime-trong-nam  -- Cấu trúc giống /anime-pho-bien lấy danh sách phim của năm hiện tại
/search  --  lấy danh sách phim có liên quan dựa vào nọi dung người dùng tìm kiếm (khi autocomplete ko đề xuất phim cần tìm thì bấm enter)
/login  -- Nơi đăng nhập khi đã đăng kí 
/register -- Nơi đăng kí (xác minh 2 bước thông qua gmail)
## Lưu ý /login và /register đang trong quá trình hoàn thiện với kiến trúc sessionToken và RefreshToken
## Nhưng tính năng sắp cập nhật
- Liệt kê các season liên quan dến phim đang xem ở /info để ng dùng tiện xem toàn bộ nội dung từ đầu season đến cuối ko cần mất công tìm kiếm
- Khi đăng nhập sẽ hiện avatar (sử dụng shacdn ui) để tạo avatar
- Tích hợp websocket cho cơ chế bình luận phim, hiện nhưng bình luận mới nhất của mỗi tập