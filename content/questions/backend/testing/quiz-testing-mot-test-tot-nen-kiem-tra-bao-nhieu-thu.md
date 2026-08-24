---
id: quiz-testing-mot-test-tot-nen-kiem-tra-bao-nhieu-thu
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một test tốt nên kiểm tra bao nhiêu thứ?

## Đáp án trắc nghiệm
- [x] Một hành vi, để khi đỏ là biết ngay chỗ sai
- [ ] Chỉ một assert duy nhất trong mỗi test, không hơn
- [ ] Càng nhiều assert càng tốt để tiết kiệm số lượng test phải viết
- [ ] Toàn bộ một luồng nghiệp vụ từ đầu đến cuối

## Giải thích (VI)
Một hành vi cho mỗi test (có thể vài assert cùng mô tả hành vi đó). Khi test đỏ, tên test phải cho biết ngay điều gì sai mà không cần mở code — đó là tiêu chí thực dụng nhất.

### Giải thích các phương án:
- **Một hành vi, để khi đỏ là biết ngay chỗ sai** (Đúng): Test kiểm mười thứ cùng lúc thì fail ở cái đầu và che mất chín cái sau.
- **Chỉ một assert duy nhất trong mỗi test, không hơn** (Sai): Quá cứng nhắc: nhiều assert cho cùng một hành vi vẫn hợp lý.
- **Càng nhiều assert càng tốt để tiết kiệm số lượng test phải viết** (Sai): Fail sớm ở assert đầu sẽ che các assert phía sau.
- **Toàn bộ một luồng nghiệp vụ từ đầu đến cuối** (Sai): Phù hợp cho một vài test e2e, không phải nguyên tắc chung.
