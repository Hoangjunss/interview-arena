---
id: quiz-elasticsearch-vi-sao-phan-trang-bang-tu-va-kich-thuoc-khong-dung-duoc-cho-trang-sau
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao phân trang bằng từ và kích thước không dùng được cho trang sâu?

## Đáp án trắc nghiệm
- [ ] Kết quả bị lặp lại khi có tài liệu mới được ghi
- [ ] Cache bộ lọc không hoạt động với trang sâu
- [x] Mỗi shard phải trả kết quả tới vị trí đó
- [ ] Elasticsearch không hỗ trợ nhảy tới trang bất kỳ

## Giải thích (VI)
Vì mỗi shard phải trả về toàn bộ kết quả tới vị trí đó cho nút điều phối sắp xếp lại. Chi phí tăng theo độ sâu trang, nên mặc định có giới hạn khoảng mười nghìn kết quả để bảo vệ cụm.

### Giải thích các phương án:
- **Kết quả bị lặp lại khi có tài liệu mới được ghi** (Sai): Đây là vấn đề riêng về tính nhất quán chứ không phải nguyên nhân của giới hạn.
- **Cache bộ lọc không hoạt động với trang sâu** (Sai): Bộ nhớ đệm không liên quan tới độ sâu trang.
- **Mỗi shard phải trả kết quả tới vị trí đó** (Đúng): Nút điều phối phải gom và sắp xếp lượng dữ liệu tăng theo độ sâu trang nên tốn bộ nhớ rất nhanh.
- **Elasticsearch không hỗ trợ nhảy tới trang bất kỳ** (Sai): Nó hỗ trợ, chỉ là tốn kém khi trang quá sâu.
