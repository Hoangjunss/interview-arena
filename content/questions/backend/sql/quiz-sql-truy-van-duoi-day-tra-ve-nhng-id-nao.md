---
id: quiz-sql-truy-van-duoi-day-tra-ve-nhng-id-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về những id nào?

## Đáp án trắc nghiệm
- [x] Không dòng nào — NOT IN gặp NULL thì không bao giờ true
- [ ] Lỗi runtime — subquery trong NOT IN không được phép trả về NULL
- [ ] id 2, 3 và cả 1 — NULL trong danh sách vô hiệu hóa toàn bộ phép NOT IN nên mọi dòng đều được giữ
- [ ] id 2 và 3 — chúng không nằm trong danh sách blocked nên qua được điều kiện NOT IN

## Giải thích (VI)
Không trả về dòng nào. id NOT IN (1, NULL) khai triển thành id <> 1 AND id <> NULL; vế id <> NULL luôn cho unknown nên toàn bộ điều kiện không bao giờ true — kể cả với id 2 và 3. Đây là bẫy kinh điển của NOT IN. Cách an toàn khi loại trừ: dùng NOT EXISTS, không bị ảnh hưởng bởi NULL trong dữ liệu.

### Giải thích các phương án:
- **Không dòng nào — NOT IN gặp NULL thì không bao giờ true** (Đúng): Đúng: id NOT IN (1, NULL) khai triển thành id <> 1 AND id <> NULL; vế sau luôn unknown nên cả biểu thức không thể true với bất kỳ id nào. id 2 và 3 chỉ cho kết quả unknown vì phép so với NULL, nên chúng cũng bị loại cùng id 1.
- **Lỗi runtime — subquery trong NOT IN không được phép trả về NULL** (Sai): Không có lỗi nào — truy vấn chạy bình thường và trả về rỗng; đây chính là điểm nguy hiểm vì bug diễn ra âm thầm.
- **id 2, 3 và cả 1 — NULL trong danh sách vô hiệu hóa toàn bộ phép NOT IN nên mọi dòng đều được giữ** (Sai): NULL không "vô hiệu hóa" NOT IN theo hướng giữ tất cả — nó khiến điều kiện thành unknown, và unknown bị WHERE loại, kết quả là rỗng.
- **id 2 và 3 — chúng không nằm trong danh sách blocked nên qua được điều kiện NOT IN** (Sai): Sẽ đúng nếu subquery không chứa NULL — nhưng NULL trong danh sách làm điều kiện với id 2, 3 thành unknown, và WHERE loại dòng unknown.
