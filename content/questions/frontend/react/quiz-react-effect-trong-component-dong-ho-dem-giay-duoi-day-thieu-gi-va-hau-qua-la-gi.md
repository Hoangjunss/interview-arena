---
id: quiz-react-effect-trong-component-dong-ho-dem-giay-duoi-day-thieu-gi-va-hau-qua-la-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Effect trong component đồng hồ đếm giây dưới đây thiếu gì, và hậu quả là gì?

## Đáp án trắc nghiệm
- [x] Thiếu cleanup function return () => clearInterval(id)
- [ ] Thiếu seconds trong dependency array — vi phạm exhaustive-deps nên effect đọc giá trị cũ
- [ ] setInterval không được phép gọi trong useEffect; phải khai báo interval ở ngoài component
- [ ] Phải chuyển sang useLayoutEffect vì setInterval cần chạy đồng bộ trước khi trình duyệt paint

## Giải thích (VI)
Thiếu cleanup: effect phải return () => clearInterval(id). Không có nó, khi component unmount interval vẫn chạy — memory leak và setState trên component đã unmount. Cleanup chạy trước khi effect chạy lại và khi unmount; mọi effect tạo timer, subscription, event listener đều cần cleanup tương ứng.

### Giải thích các phương án:
- **Thiếu cleanup function return () => clearInterval(id)** (Đúng): Khi component unmount, interval vẫn chạy, gây memory leak và setState trên component đã unmount. Đúng: effect tạo subscription/timer phải trả về cleanup; thiếu nó, interval sống mãi sau unmount (và trong StrictMode dev sẽ bị nhân đôi interval).
- **Thiếu seconds trong dependency array — vi phạm exhaustive-deps nên effect đọc giá trị cũ** (Sai): Callback dùng functional updater (s) => s + 1 nên không đọc seconds từ closure — array rỗng là đúng ở đây; vấn đề nằm ở cleanup.
- **setInterval không được phép gọi trong useEffect; phải khai báo interval ở ngoài component** (Sai): useEffect chính là nơi đúng để tạo interval gắn với lifecycle của component; đặt ngoài component mới là sai vì không gắn với mount/unmount.
- **Phải chuyển sang useLayoutEffect vì setInterval cần chạy đồng bộ trước khi trình duyệt paint** (Sai): Timer không liên quan đến layout hay paint — useEffect là đúng chỗ; useLayoutEffect chỉ dành cho việc đọc/ghi layout trước paint.
