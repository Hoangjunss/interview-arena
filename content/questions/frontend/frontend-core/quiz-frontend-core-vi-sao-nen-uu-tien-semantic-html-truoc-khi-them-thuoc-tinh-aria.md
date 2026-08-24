---
id: quiz-frontend-core-vi-sao-nen-uu-tien-semantic-html-truoc-khi-them-thuoc-tinh-aria
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên ưu tiên semantic HTML trước khi thêm thuộc tính ARIA?

## Đáp án trắc nghiệm
- [ ] Semantic HTML chỉ ảnh hưởng tới SEO, không liên quan tới trợ năng
- [x] Thẻ ngữ nghĩa mang sẵn vai trò, trạng thái và hành vi bàn phím; ARIA chỉ mô tả thêm
- [ ] ARIA làm trang tải chậm hơn đáng kể nên chỉ dùng khi thật cần
- [ ] Trình duyệt hiện đại đã bỏ qua hoàn toàn mọi thuộc tính ARIA khi render nội dung trang

## Giải thích (VI)
Thẻ ngữ nghĩa mang sẵn ba thứ: vai trò cho trình đọc màn hình, hành vi bàn phím (focus, Enter/Space) và trạng thái mặc định. <div role="button"> chỉ có vai trò — vẫn phải tự thêm tabindex, xử lý phím, và trạng thái aria-disabled. Nguyên tắc chung là dùng phần tử đúng nghĩa trước, ARIA chỉ để mô tả những thứ HTML không diễn đạt được (ví dụ aria-live, aria-expanded).

### Giải thích các phương án:
- **Semantic HTML chỉ ảnh hưởng tới SEO, không liên quan tới trợ năng** (Sai): Nó ảnh hưởng trực tiếp tới cây trợ năng mà trình đọc màn hình dựa vào.
- **Thẻ ngữ nghĩa mang sẵn vai trò, trạng thái và hành vi bàn phím; ARIA chỉ mô tả thêm** (Đúng): Đúng: ARIA đổi cách trợ năng đọc phần tử chứ không tự thêm hành vi. Thay <button> bằng <div role="button"> là phải tự viết lại tabindex, xử lý phím Enter/Space và trạng thái disabled.
- **ARIA làm trang tải chậm hơn đáng kể nên chỉ dùng khi thật cần** (Sai): Chi phí hiệu năng không phải lý do; vấn đề là hành vi và tính đúng đắn.
- **Trình duyệt hiện đại đã bỏ qua hoàn toàn mọi thuộc tính ARIA khi render nội dung trang** (Sai): ARIA được trình đọc màn hình sử dụng; nó có tác dụng thật.
