---
id: quiz-nextjs-thu-muc-marketing-va-components-trong-app-khac-nhau-the-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thư mục (marketing) và _components trong app/ khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Cả hai đều bị loại khỏi URL, chỉ khác quy ước đặt tên
- [ ] _components tạo route bắt đầu bằng dấu gạch dưới trong URL
- [ ] (marketing) chỉ dùng cho trang marketing theo quy ước của Next.js
- [x] (marketing) là route group — tên trong ngoặc không xuất hiện trong URL

## Giải thích (VI)
Ngoặc đơn (tên) nhóm các route lại để dùng chung layout mà không thêm đoạn nào vào URL. Gạch dưới _tên loại thư mục khỏi routing hoàn toàn — dùng để đặt component, helper cạnh nơi sử dụng mà không sợ thành route.

### Giải thích các phương án:
- **Cả hai đều bị loại khỏi URL, chỉ khác quy ước đặt tên** (Sai): Route group vẫn tạo route cho các thư mục con; thư mục gạch dưới thì không.
- **_components tạo route bắt đầu bằng dấu gạch dưới trong URL** (Sai): Ngược lại — nó không tạo route nào.
- **(marketing) chỉ dùng cho trang marketing theo quy ước của Next.js** (Sai): Tên trong ngoặc là tùy ý, không có ý nghĩa đặc biệt nào.
- **(marketing) là route group — tên trong ngoặc không xuất hiện trong URL** (Đúng): _components bắt đầu bằng gạch dưới nên bị loại hoàn toàn khỏi hệ thống route. Một cái nhóm route mà giấu tên khỏi URL, một cái loại hẳn khỏi routing. Bên trong route group vẫn tạo route bình thường, khác hẳn thư mục bị loại khỏi routing.
