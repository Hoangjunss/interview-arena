---
id: quiz-git-vi-sao-nen-dung-git-push-force-with-lease-thay-cho-git-push-force
position: backend
technology: git
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng git push --force-with-lease thay cho git push --force?

## Đáp án trắc nghiệm
- [ ] Hai cờ giống hệt nhau, --force là tên viết tắt
- [ ] --force-with-lease tự động merge thay vì ghi đè
- [x] Nó kiểm tra remote có đúng như lần cuối bạn fetch không
- [ ] --force-with-lease nhanh hơn vì chỉ đẩy phần chênh lệch

## Giải thích (VI)
--force ghi đè vô điều kiện. --force-with-lease chỉ ghi đè khi remote vẫn đúng như lần cuối bạn fetch — có người push thêm thì nó dừng lại. Đây là lưới an toàn cho tình huống hai người cùng làm trên một nhánh.

### Giải thích các phương án:
- **Hai cờ giống hệt nhau, --force là tên viết tắt** (Sai): Chúng khác nhau rõ rệt về mức an toàn.
- **--force-with-lease tự động merge thay vì ghi đè** (Sai): Nó không merge — chỉ từ chối khi phát hiện remote đã đổi.
- **Nó kiểm tra remote có đúng như lần cuối bạn fetch không** (Đúng): Nếu ai đó vừa push thêm, lệnh bị từ chối thay vì ghi đè mất công sức của họ. Đây chính là cơ chế "compare-and-swap" giúp force push an toàn hơn.
- **--force-with-lease nhanh hơn vì chỉ đẩy phần chênh lệch** (Sai): Cả hai đều đẩy như nhau; khác biệt nằm ở bước kiểm tra an toàn.
