---
id: quiz-vuejs-single-file-component-sfc-la-gi
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Single File Component (SFC) là gì?

## Đáp án trắc nghiệm
- [ ] Một định dạng chạy trực tiếp trong trình duyệt mà không cần bước build
- [x] Một file .vue gồm ba khối <template>, <script> và <style>
- [ ] Một cách viết chỉ dùng được với Options API của Vue 2
- [ ] Một file JavaScript chứa toàn bộ component của ứng dụng

## Giải thích (VI)
SFC là file .vue gom ba phần của một component: <template> (cấu trúc), <script> (logic) và <style> (giao diện). Build tool như Vite biên dịch nó thành module JavaScript. Thêm scoped vào <style> để CSS chỉ áp dụng trong component, tránh rò ra ngoài.

### Giải thích các phương án:
- **Một định dạng chạy trực tiếp trong trình duyệt mà không cần bước build** (Sai): Trình duyệt không hiểu .vue; cần Vite hoặc công cụ tương đương biên dịch.
- **Một file .vue gồm ba khối <template>, <script> và <style>** (Đúng): Đúng: gom ba mối quan tâm của cùng một component vào một file. Trình duyệt không hiểu .vue nên cần build tool biên dịch thành module JavaScript.
- **Một cách viết chỉ dùng được với Options API của Vue 2** (Sai): SFC dùng được với cả Options API và Composition API.
- **Một file JavaScript chứa toàn bộ component của ứng dụng** (Sai): "Single file" nói tới một component một file, không phải gom cả ứng dụng.
