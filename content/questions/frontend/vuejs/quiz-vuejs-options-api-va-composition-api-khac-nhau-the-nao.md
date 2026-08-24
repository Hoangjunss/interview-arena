---
id: quiz-vuejs-options-api-va-composition-api-khac-nhau-the-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Options API và Composition API khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] Composition API chạy nhanh hơn nhiều lần vì không dùng tới hệ reactivity
- [ ] Composition API chỉ dùng được khi viết bằng TypeScript
- [ ] Options API đã bị gỡ khỏi Vue 3 nên code cũ phải viết lại
- [x] Options API tổ chức theo loại; Composition API tổ chức theo mối quan tâm

## Giải thích (VI)
Options API chia code theo loại: data, computed, methods, watch. Composition API gom theo tính năng: mọi thứ liên quan tới một mối quan tâm nằm cùng chỗ trong setup, và tách được thành composable để dùng lại. Component nhỏ thì hai cách tương đương; component lớn nhiều mối quan tâm thì Composition API tránh được việc phải nhảy qua lại giữa các khối.

### Giải thích các phương án:
- **Composition API chạy nhanh hơn nhiều lần vì không dùng tới hệ reactivity** (Sai): Cả hai dùng chung hệ thống reactivity; khác biệt hiệu năng không đáng kể.
- **Composition API chỉ dùng được khi viết bằng TypeScript** (Sai): Dùng được với JavaScript thuần; TypeScript chỉ được suy luận kiểu tốt hơn.
- **Options API đã bị gỡ khỏi Vue 3 nên code cũ phải viết lại** (Sai): Options API vẫn được hỗ trợ đầy đủ trong Vue 3.
- **Options API tổ chức theo loại; Composition API tổ chức theo mối quan tâm** (Đúng): Đúng: khác biệt là trục tổ chức code, không phải khả năng. Options API gom theo data/methods/computed; Composition API đặt logic liên quan cạnh nhau trong setup và tách ra thành composable dùng lại được.
