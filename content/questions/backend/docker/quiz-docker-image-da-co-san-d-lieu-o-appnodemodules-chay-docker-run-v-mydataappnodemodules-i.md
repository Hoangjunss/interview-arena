---
id: quiz-docker-image-da-co-san-d-lieu-o-appnodemodules-chay-docker-run-v-mydataappnodemodules-i
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Image đã có sẵn dữ liệu ở /app/node_modules. Chạy docker run -v mydata:/app/node_modules img với mydata là named volume còn rỗng thì thư mục đó chứa gì?

## Đáp án trắc nghiệm
- [ ] Container không khởi động được vì không thể mount volume lên thư mục đã có dữ liệu
- [x] Vẫn thấy nội dung của image — named volume còn rỗng thì được pre-populate
- [ ] Thư mục rỗng — volume luôn che hoàn toàn nội dung sẵn có của image
- [ ] Nội dung image và volume được đồng bộ hai chiều mỗi lần container khởi động

## Giải thích (VI)
Vẫn thấy nội dung của image. Named volume rỗng được Docker nạp sẵn nội dung của thư mục đích trong image ở lần mount đầu. Từ lần sau volume đã có dữ liệu nên giữ nguyên. Bind mount thì ngược lại — luôn che nội dung image.

### Giải thích các phương án:
- **Container không khởi động được vì không thể mount volume lên thư mục đã có dữ liệu** (Sai): Mount lên thư mục có sẵn dữ liệu là hoàn toàn hợp lệ.
- **Vẫn thấy nội dung của image — named volume còn rỗng thì được pre-populate** (Đúng): Đây là hành vi pre-population: khi named volume còn rỗng, Docker copy nội dung sẵn có của thư mục trong image vào volume ở lần mount đầu tiên. Không áp dụng cho bind mount.
- **Thư mục rỗng — volume luôn che hoàn toàn nội dung sẵn có của image** (Sai): Đúng với bind mount, nhưng named volume rỗng thì được nạp sẵn nội dung từ image.
- **Nội dung image và volume được đồng bộ hai chiều mỗi lần container khởi động** (Sai): Không có cơ chế đồng bộ nào; chỉ có một lần copy duy nhất khi volume còn rỗng.
