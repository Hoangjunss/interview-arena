---
id: quiz-mongodb-updateone-id-1-name-b-va-updateone-id-1-set-name-b-khac-nhau-the-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
updateOne({ _id: 1 }, { name: "B" }) và updateOne({ _id: 1 }, { $set: { name: "B" } }) khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Hai cách hoàn toàn tương đương, $set chỉ là cú pháp dài dòng hơn
- [x] Bản không toán tử THAY THẾ cả document; $set chỉ sửa trường được nêu
- [ ] $set chỉ dùng được cho trường mới, trường đã tồn tại phải dùng $replace
- [ ] Bản không có $set nhanh hơn vì bỏ qua bước phân tích toán tử

## Giải thích (VI)
Không có toán tử $ là ngữ nghĩa thay thế toàn bộ document — mọi trường không nêu sẽ biến mất. $set chỉ sửa trường được liệt kê. Driver hiện đại từ chối updateOne không có toán tử để chặn mất dữ liệu ngoài ý muốn; muốn thay thế thật thì dùng replaceOne.

### Giải thích các phương án:
- **Hai cách hoàn toàn tương đương, $set chỉ là cú pháp dài dòng hơn** (Sai): Khác nhau về ngữ nghĩa: thay thế toàn bộ so với cập nhật một phần.
- **Bản không toán tử THAY THẾ cả document; $set chỉ sửa trường được nêu** (Đúng): Thiếu toán tử cập nhật là thay thế document (mọi trường khác bị mất) — đây là lý do driver hiện đại từ chối luôn dạng này.
- **$set chỉ dùng được cho trường mới, trường đã tồn tại phải dùng $replace** (Sai): $set dùng được cho cả hai; không có toán tử $replace.
- **Bản không có $set nhanh hơn vì bỏ qua bước phân tích toán tử** (Sai): Khác biệt nằm ở kết quả, không phải hiệu năng.
