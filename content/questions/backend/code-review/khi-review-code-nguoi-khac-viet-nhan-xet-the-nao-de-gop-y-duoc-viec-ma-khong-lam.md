---
id: khi-review-code-nguoi-khac-viet-nhan-xet-the-nao-de-gop-y-duoc-viec-ma-khong-lam
position: backend
technology: code-review
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi review code người khác, viết nhận xét thế nào để góp ý được việc mà không làm người nhận khó chịu?

## Question (EN)
When reviewing someone else's code, how do you write comments that fix the problem without upsetting the author?

## Đáp án chi tiết (VI)
Nguyên tắc gốc: **nhận xét nhắm vào code, không nhắm vào người**, và nêu rõ lý do thay vì chỉ ra lệnh.\
\
- Thay \\"anh viết hàm này sai rồi\\" bằng \\"hàm này chưa xử lý trường hợp danh sách rỗng, dòng 42 sẽ ném lỗi\\".\
- **Giải thích tại sao**, để người nhận học được nguyên tắc chứ không chỉ sửa một chỗ. Nếu góp ý dài, kèm link tài liệu hoặc đoạn code mẫu.\
- **Phân loại mức độ**. Việc bắt buộc sửa và việc tuỳ chọn phải khác nhau rõ ràng, thường quy ước bằng tiền tố:\
\
```text\
blocker: query này chạy trong vòng lặp, sẽ thành N+1 khi list \u003e 100\
nit: đổi tên biến `d` thành `deadline` cho dễ đọc (optional)\
question: chỗ này cố ý bỏ qua lỗi hay quên xử lý?\
```\
\
- Hỏi thay vì phán khi bạn chưa chắc — người viết thường có bối cảnh bạn không biết.\
- Khen chỗ làm tốt một cách cụ thể; điều này giúp review không chỉ toàn danh sách lỗi.\
\
Mục tiêu của review không phải chứng minh mình giỏi hơn, mà là đưa code lên mức **cải thiện được sức khoẻ tổng thể của codebase**. Không cần code hoàn hảo mới approve.

## Detailed Answer (EN)
Core rule: **comment on the code, not the person**, and give the reason instead of an order.\
\
- Replace \\"you wrote this function wrong\\" with \\"this function doesn't handle an empty list; line 42 will throw\\".\
- **Explain why**, so the author learns the principle rather than patching one spot. For longer points, link docs or paste a short example.\
- **Label severity.** Blocking issues and optional suggestions must be visibly different, usually via a prefix:\
\
```text\
blocker: this query runs inside a loop, it becomes N+1 once the list \u003e 100\
nit: rename `d` to `deadline` for readability (optional)\
question: is swallowing this error intentional, or an oversight?\
```\
\
- Ask instead of assert when unsure — the author usually has context you lack.\
- Call out what was done well, specifically, so the review is not purely a defect list.\
\
The goal is not to prove you are smarter; it is to get the change to a state that **improves the overall health of the codebase**. Code does not have to be perfect to be approved.
