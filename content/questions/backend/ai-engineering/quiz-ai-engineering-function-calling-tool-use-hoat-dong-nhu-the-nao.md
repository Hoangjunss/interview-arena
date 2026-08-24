---
id: quiz-ai-engineering-function-calling-tool-use-hoat-dong-nhu-the-nao
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Function calling (tool use) hoạt động như thế nào?

## Đáp án trắc nghiệm
- [ ] Đây là tính năng chỉ hoạt động với model đã fine-tune riêng cho từng hàm
- [ ] Ứng dụng gửi mã nguồn hàm lên và model biên dịch rồi chạy
- [ ] Model tự kết nối internet và chạy hàm trên máy chủ của nhà cung cấp
- [x] Model trả về ý định gọi hàm; ứng dụng thực thi rồi gửi kết quả lại

## Giải thích (VI)
Ứng dụng khai báo hàm kèm JSON schema. Model quyết định có cần gọi hàm nào không và sinh ra tham số. Ứng dụng tự thực thi rồi trả kết quả về; model dùng kết quả đó để soạn câu trả lời. Model không bao giờ tự chạy code — mọi hành động đều do ứng dụng quyết định.

### Giải thích các phương án:
- **Đây là tính năng chỉ hoạt động với model đã fine-tune riêng cho từng hàm** (Sai): Model đa dụng hỗ trợ sẵn, không cần fine-tune cho từng hàm.
- **Ứng dụng gửi mã nguồn hàm lên và model biên dịch rồi chạy** (Sai): Chỉ mô tả và schema được gửi lên, không phải mã nguồn để chạy.
- **Model tự kết nối internet và chạy hàm trên máy chủ của nhà cung cấp** (Sai): Model không có khả năng thực thi; nó chỉ sinh văn bản có cấu trúc.
- **Model trả về ý định gọi hàm; ứng dụng thực thi rồi gửi kết quả lại** (Đúng): Model chỉ sinh ra lời gọi có cấu trúc từ schema tham số mà ứng dụng mô tả; việc thực thi hoàn toàn thuộc về ứng dụng, sau đó kết quả được gửi lại để model soạn câu trả lời.
