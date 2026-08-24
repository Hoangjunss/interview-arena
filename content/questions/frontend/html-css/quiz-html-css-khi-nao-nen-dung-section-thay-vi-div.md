---
id: quiz-html-css-khi-nao-nen-dung-section-thay-vi-div
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng <section> thay vì <div>?

## Đáp án trắc nghiệm
- [ ] Khi cần áp dụng CSS Grid hoặc Flexbox — <div> không hỗ trợ các display mới
- [ ] Luôn luôn — <section> là phiên bản mới thay thế hoàn toàn <div> trong HTML5
- [ ] Khi muốn phần tử tự có margin và style mặc định đẹp hơn
- [x] Khi khối nội dung có chủ đề riêng (thường kèm heading)

## Giải thích (VI)
Dùng <section> khi khối nội dung có chủ đề riêng , thường đi kèm heading — ví dụ trang sản phẩm có section mô tả, section reviews, section thông số. Dùng <div> khi chỉ cần một hộp để style hoặc layout, không mang ý nghĩa nội dung. Screen reader nhận diện <section> như một vùng nội dung; <div> thì vô hình về ngữ nghĩa.

### Giải thích các phương án:
- **Khi cần áp dụng CSS Grid hoặc Flexbox — <div> không hỗ trợ các display mới** (Sai): Mọi phần tử đều nhận display: grid/flex như nhau; việc chọn thẻ không liên quan tới khả năng layout.
- **Luôn luôn — <section> là phiên bản mới thay thế hoàn toàn <div> trong HTML5** (Sai): <div> vẫn là lựa chọn đúng khi chỉ cần một wrapper để style/layout; bọc mọi thứ bằng <section> vô nghĩa còn làm nhiễu accessibility tree.
- **Khi muốn phần tử tự có margin và style mặc định đẹp hơn** (Sai): <section> và <div> có style mặc định gần như giống nhau (cùng là block); khác biệt nằm ở ngữ nghĩa, không phải hình thức.
- **Khi khối nội dung có chủ đề riêng (thường kèm heading)** (Đúng): Ví dụ phần mô tả, phần reviews của trang sản phẩm; <div> chỉ dành cho nhóm phần tử thuần style/layout. Đúng ranh giới: <section> mang ý nghĩa "một phần nội dung theo chủ đề" và được screen reader nhận diện; <div> không có ý nghĩa gì, chỉ là hộp để style.
