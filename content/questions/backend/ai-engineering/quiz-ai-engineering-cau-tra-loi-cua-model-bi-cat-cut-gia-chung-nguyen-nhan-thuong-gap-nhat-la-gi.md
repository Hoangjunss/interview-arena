---
id: quiz-ai-engineering-cau-tra-loi-cua-model-bi-cat-cut-gia-chung-nguyen-nhan-thuong-gap-nhat-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu trả lời của model bị cắt cụt giữa chừng. Nguyên nhân thường gặp nhất là gì?

## Đáp án trắc nghiệm
- [ ] Bộ lọc an toàn chặn phần còn lại
- [x] Đạt giới hạn max_tokens đặt cho lần gọi
- [ ] Model hết context window nên tự dừng
- [ ] Kết nối mạng bị đứt giữa chừng khi đang nhận phản hồi

## Giải thích (VI)
Gần như luôn là do max_tokens. Response có trường cho biết lý do dừng — giá trị báo "đạt giới hạn độ dài" khác hẳn với "model tự kết thúc". Ứng dụng nên đọc trường này để biết câu trả lời có trọn vẹn hay không.

### Giải thích các phương án:
- **Bộ lọc an toàn chặn phần còn lại** (Sai): Bộ lọc thường từ chối cả câu trả lời với thông báo riêng, không cắt giữa chừng.
- **Đạt giới hạn max_tokens đặt cho lần gọi** (Đúng): Trường lý do dừng trong response phân biệt rõ giữa "hoàn tất" và "chạm trần độ dài" — bị cắt vì độ dài chứ không phải model đã nói xong.
- **Model hết context window nên tự dừng** (Sai): Vượt context thường gây lỗi ngay từ đầu, không phải cắt giữa câu trả lời.
- **Kết nối mạng bị đứt giữa chừng khi đang nhận phản hồi** (Sai): Mạng đứt thường gây lỗi rõ ràng chứ không trả về response hợp lệ.
