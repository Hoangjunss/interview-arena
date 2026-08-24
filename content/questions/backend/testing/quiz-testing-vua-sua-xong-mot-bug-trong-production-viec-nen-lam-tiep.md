---
id: quiz-testing-vua-sua-xong-mot-bug-trong-production-viec-nen-lam-tiep
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vừa sửa xong một bug trong production. Việc nên làm tiếp?

## Đáp án trắc nghiệm
- [ ] Rà soát các chỗ khác có mẫu code tương tự
- [x] Viết test tái hiện bug đó, xác nhận nó đỏ trước khi sửa
- [ ] Thêm log chi tiết hơn ở khu vực vừa xảy ra lỗi
- [ ] Ghi lại nguyên nhân vào tài liệu nội bộ để cả nhóm cùng biết

## Giải thích (VI)
Viết regression test tái hiện bug. Thứ tự quan trọng: viết test trước khi sửa và xác nhận nó đỏ — nếu nó xanh ngay từ đầu thì bạn chưa tái hiện đúng bug, và bản sửa có thể không đúng chỗ.

### Giải thích các phương án:
- **Rà soát các chỗ khác có mẫu code tương tự** (Sai): Việc nên làm, nhưng bước đầu tiên vẫn là chốt lại bug bằng một test.
- **Viết test tái hiện bug đó, xác nhận nó đỏ trước khi sửa** (Đúng): Test đó chứng minh bug đã hết và chặn nó quay lại sau này.
- **Thêm log chi tiết hơn ở khu vực vừa xảy ra lỗi** (Sai): Giúp điều tra lần sau nhưng không bảo vệ được hành vi đúng.
- **Ghi lại nguyên nhân vào tài liệu nội bộ để cả nhóm cùng biết** (Sai): Hữu ích nhưng tài liệu không chặn được bug tái xuất hiện.
