self.addEventListener('fetch', (event) => {
  // Kiểm tra xem request có chứa tên file độc hại đó không
  if (event.request.url.includes('avs-shield.min.js')) {
    console.log("🛑 Đã chặn script bẩn:", event.request.url);
    // Trả về một phản hồi rỗng, chặn không cho nó tải về
    event.respondWith(new Response(null, { status: 403 }));
  }
});