---
id: quiz-ci-cd-dung-self-hosted-runner-cho-ci-co-rui-ro-gi-so-voi-runner-cua-nha-cung-cap
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng self-hosted runner cho CI có rủi ro gì so với runner của nhà cung cấp?

## Đáp án trắc nghiệm
- [ ] Không tích hợp được với các action có sẵn của cộng đồng
- [ ] Không dùng được secret của repository trên runner riêng
- [ ] Không chạy được job song song trên self-hosted runner
- [x] Máy không sạch giữa các lần chạy nên job này ảnh hưởng job khác

## Giải thích (VI)
Máy không sạch giữa các lần chạy : cache, tệp tạm, biến môi trường và cả credential còn sót lại từ job trước. Job này có thể lấy dữ liệu của job khác, và build "chạy được" chỉ vì máy đó đã cài sẵn thứ gì đó.

### Giải thích các phương án:
- **Không tích hợp được với các action có sẵn của cộng đồng** (Sai): Action vẫn chạy như trên runner của nhà cung cấp.
- **Không dùng được secret của repository trên runner riêng** (Sai): Secret vẫn được truyền vào runner riêng bình thường.
- **Không chạy được job song song trên self-hosted runner** (Sai): Chạy song song được nếu cấu hình nhiều runner hoặc nhiều slot.
- **Máy không sạch giữa các lần chạy nên job này ảnh hưởng job khác** (Đúng): Runner của nhà cung cấp là máy mới mỗi lần, còn self-hosted giữ lại mọi thứ đã cài.
