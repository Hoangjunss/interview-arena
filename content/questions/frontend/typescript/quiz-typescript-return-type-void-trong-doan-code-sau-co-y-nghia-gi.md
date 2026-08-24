---
id: quiz-typescript-return-type-void-trong-doan-code-sau-co-y-nghia-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Return type void trong đoạn code sau có ý nghĩa gì?

## Đáp án trắc nghiệm
- [ ] Khai báo : void là bắt buộc cho hàm không có return — thiếu nó sẽ lỗi compile
- [x] Hàm không trả về giá trị có ý nghĩa — thân hàm khai báo : void mà return một giá trị sẽ bị báo lỗi compile
- [ ] void và never là một — đều nghĩa là hàm không trả về gì
- [ ] void khiến hàm không thể có câu lệnh return dưới bất kỳ hình thức nào

## Giải thích (VI)
void biểu diễn kiểu trả về của hàm không return giá trị có ý nghĩa — hàm gọi vì side effect. Trong hàm khai báo : void, return kèm giá trị là lỗi compile, nhưng return; để thoát sớm vẫn hợp lệ. Khác never: hàm void chạy xong bình thường, hàm never không bao giờ kết thúc bình thường (luôn throw).

### Giải thích các phương án:
- **Khai báo : void là bắt buộc cho hàm không có return — thiếu nó sẽ lỗi compile** (Sai): Không bắt buộc: type inference tự suy ra void cho hàm không return giá trị; annotation chỉ là cách chốt hợp đồng tường minh.
- **Hàm không trả về giá trị có ý nghĩa — thân hàm khai báo : void mà return một giá trị sẽ bị báo lỗi compile** (Đúng): void dành cho hàm gọi vì side effect (log, gán, gọi API); compiler chặn return value trong hàm tự khai báo : void để hợp đồng "không trả gì" được giữ đúng.
- **void và never là một — đều nghĩa là hàm không trả về gì** (Sai): Khác nhau: hàm void chạy xong bình thường (chỉ không trả giá trị hữu ích); hàm never không bao giờ chạy xong (luôn throw hoặc lặp vô hạn).
- **void khiến hàm không thể có câu lệnh return dưới bất kỳ hình thức nào** (Sai): return; không kèm giá trị (để thoát sớm) vẫn hợp lệ trong hàm void — chỉ return KÈM giá trị mới bị chặn.
