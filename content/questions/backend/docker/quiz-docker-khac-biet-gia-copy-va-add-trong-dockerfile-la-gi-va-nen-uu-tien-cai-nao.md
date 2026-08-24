---
id: quiz-docker-khac-biet-gia-copy-va-add-trong-dockerfile-la-gi-va-nen-uu-tien-cai-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa COPY và ADD trong Dockerfile là gì, và nên ưu tiên cái nào?

## Đáp án trắc nghiệm
- [ ] COPY và ADD giống hệt nhau, ADD chỉ là alias cũ của COPY
- [ ] COPY chỉ copy được một file, còn ADD mới copy được cả thư mục con
- [x] Cả hai đều copy file; ADD thêm hành vi giải nén tar và tải URL
- [ ] ADD nhanh hơn COPY vì nén dữ liệu trước khi ghi vào layer

## Giải thích (VI)
Cả hai copy file/thư mục từ build context vào image. ADD thêm hành vi: tự giải nén tar archive local và hỗ trợ URL trong một số trường hợp. Vì các hành vi ẩn này dễ gây bất ngờ, production nên ưu tiên COPY cho rõ ràng, chỉ dùng ADD khi thực sự cần giải nén tar có chủ đích.

### Giải thích các phương án:
- **COPY và ADD giống hệt nhau, ADD chỉ là alias cũ của COPY** (Sai): Hiểu nhầm: ADD có thêm tính năng (giải nén tar, URL) khiến hành vi khác COPY, không phải alias.
- **COPY chỉ copy được một file, còn ADD mới copy được cả thư mục con** (Sai): COPY copy được cả file lẫn thư mục — số lượng không phải điểm khác biệt.
- **Cả hai đều copy file; ADD thêm hành vi giải nén tar và tải URL** (Đúng): Đúng: COPY là phép sao chép thuần; ADD có hành vi ẩn nên production ưu tiên COPY cho rõ ràng, chỉ dùng ADD khi thực sự cần giải nén tar có chủ đích.
- **ADD nhanh hơn COPY vì nén dữ liệu trước khi ghi vào layer** (Sai): ADD không nén để tăng tốc; khác biệt là ở hành vi giải nén tar và tải URL, không phải hiệu năng.
