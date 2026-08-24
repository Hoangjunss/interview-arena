---
id: quiz-flutter-danh-sach-5000-dong-dung-bang-listview-voi-children-giat-rat-nang-vi-sao
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Danh sách 5000 dòng dựng bằng ListView với children giật rất nặng. Vì sao?

## Đáp án trắc nghiệm
- [x] Toàn bộ 5000 widget được dựng ngay lập tức
- [ ] Do thiếu key nên Flutter phải dựng lại cây con mỗi lần
- [ ] ListView vẽ lại toàn bộ danh sách sau mỗi khung hình cuộn
- [ ] Mỗi dòng tạo một RepaintBoundary riêng gây tốn bộ nhớ

## Giải thích (VI)
Dạng ListView(children: [...]) dựng sẵn toàn bộ phần tử trước khi hiển thị. Với 5000 dòng là 5000 widget cùng lúc. ListView.builder chỉ dựng phần đang nhìn thấy cộng một vùng đệm, nên chi phí không còn phụ thuộc độ dài danh sách.

### Giải thích các phương án:
- **Toàn bộ 5000 widget được dựng ngay lập tức** (Đúng): Dạng children nhận sẵn một danh sách nên không có cơ chế dựng lười theo vùng nhìn thấy.
- **Do thiếu key nên Flutter phải dựng lại cây con mỗi lần** (Sai): Thiếu key gây lẫn state chứ không tạo ra chi phí dựng ban đầu này.
- **ListView vẽ lại toàn bộ danh sách sau mỗi khung hình cuộn** (Sai): Cuộn chỉ dịch chuyển vùng vẽ, phần ngoài màn hình không được vẽ lại.
- **Mỗi dòng tạo một RepaintBoundary riêng gây tốn bộ nhớ** (Sai): Ranh giới vẽ lại giúp giảm chi phí chứ không phải nguyên nhân giật.
