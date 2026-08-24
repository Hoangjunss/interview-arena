---
id: quiz-thuat-toan-ctdl-truong-hop-xau-nhat-cua-tra-cuu-hash-map-la-on-dieu-gi-gay-ra-no
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trường hợp xấu nhất của tra cứu hash map là O(n). Điều gì gây ra nó?

## Đáp án trắc nghiệm
- [ ] Khoá quá dài nên hàm băm phải chạy nhiều vòng lặp
- [x] Nhiều khoá cùng rơi vào một ô, tạo ra danh sách dài
- [ ] Bảng bị cấp phát lại quá thường xuyên khi thêm phần tử
- [ ] Bảng có quá nhiều ô trống nên phải quét tìm ô có dữ liệu

## Giải thích (VI)
Va chạm dồn cục. Nếu hàm băm phân tán kém, hoặc dữ liệu bị chọn có chủ đích, mọi khoá rơi vào cùng một ô và ô đó thành danh sách n phần tử, nên tra cứu phải duyệt hết. Cài đặt hiện đại chống việc này bằng băm có mầm ngẫu nhiên và chuyển ô đông thành cây cân bằng.

### Giải thích các phương án:
- **Khoá quá dài nên hàm băm phải chạy nhiều vòng lặp** (Sai): Điều này làm tăng chi phí băm nhưng không tạo ra bậc n theo số phần tử.
- **Nhiều khoá cùng rơi vào một ô, tạo ra danh sách dài** (Đúng): Khi va chạm dồn hết vào một ô thì tra cứu phải duyệt cả danh sách đó.
- **Bảng bị cấp phát lại quá thường xuyên khi thêm phần tử** (Sai): Cấp phát lại là chi phí khi ghi và đã được khấu hao, không phải chi phí tra cứu.
- **Bảng có quá nhiều ô trống nên phải quét tìm ô có dữ liệu** (Sai): Ô trống không bị quét; vị trí được tính trực tiếp từ giá trị băm.
