---
id: quiz-vuejs-computed-watch-va-watcheffect-nen-dung-trong-tinh-huong-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
computed, watch và watchEffect nên dùng trong tình huống nào?

## Đáp án trắc nghiệm
- [x] computed cho giá trị dẫn xuất, watch theo nguồn cụ thể, watchEffect tự dò
- [ ] Nên đặt lời gọi API trong computed để tự cache kết quả
- [ ] watchEffect chỉ chạy một lần khi component mount chứ không bao giờ chạy lại nữa
- [ ] computed và watch giống hệt nhau, chọn cái nào cũng được

## Giải thích (VI)
computed khai báo giá trị dẫn xuất: có cache, chỉ tính lại khi phụ thuộc đổi, phải thuần và đồng bộ. watch theo dõi một nguồn cụ thể để chạy tác dụng phụ, cho cả giá trị cũ và mới, mặc định không chạy ngay (bật bằng immediate: true). watchEffect chạy ngay và tự theo dõi mọi thứ đọc bên trong — gọn khi phụ thuộc nhiều nhưng khó thấy rõ nguồn kích hoạt.

### Giải thích các phương án:
- **computed cho giá trị dẫn xuất, watch theo nguồn cụ thể, watchEffect tự dò** (Đúng): Đúng: dẫn xuất — tác dụng phụ có nguồn rõ — tác dụng phụ tự dò phụ thuộc. computed có cache và không được có tác dụng phụ; watch cho biết giá trị cũ/mới; watchEffect tự theo dõi mọi nguồn đọc bên trong.
- **Nên đặt lời gọi API trong computed để tự cache kết quả** (Sai): computed phải thuần và đồng bộ; gọi API trong đó khiến hành vi không dự đoán được.
- **watchEffect chỉ chạy một lần khi component mount chứ không bao giờ chạy lại nữa** (Sai): Nó chạy ngay lần đầu và chạy lại mỗi khi phụ thuộc đọc bên trong thay đổi.
- **computed và watch giống hệt nhau, chọn cái nào cũng được** (Sai): computed trả về giá trị và có cache; watch không trả về giá trị mà chạy tác dụng phụ.
