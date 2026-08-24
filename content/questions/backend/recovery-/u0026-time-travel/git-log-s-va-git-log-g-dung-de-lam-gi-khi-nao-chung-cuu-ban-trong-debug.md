---
id: git-log-s-va-git-log-g-dung-de-lam-gi-khi-nao-chung-cuu-ban-trong-debug
position: backend
technology: recovery-\u0026-time-travel
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`git log -S` và `git log -G` dùng để làm gì? Khi nào chúng cứu bạn trong debug?

## Question (EN)
What are `git log -S` and `git log -G` used for? When do they save you during debugging?

## Đáp án chi tiết (VI)
**Pickaxe search** — tìm commits đã thêm/xóa một chuỗi cụ thể trong code.\
\
- **`git log -S \\"string\\"`** (pickaxe): tìm commits mà **số lần xuất hiện** của string thay đổi (thêm hoặc xóa) — chính xác hơn khi code bị rename/move.\
- **`git log -G \\"regex\\"`**: tìm commits mà diff có dòng match regex pattern.\
\
```bash\
git log -S \\"calculateDiscount\\" --oneline       # commit nào thêm/xóa function này\
git log -S \\"SECRET_KEY\\" --all                  # mọi branches — security audit\
git log -G \\"discountRate\\\\s*=\\\\s*[0-9]+\\"         # mọi lần giá trị discountRate bị đổi\
git log -S \\"applyTax\\" --since=\\"2024-01-01\\" -p  # -p kèm diff — ai đổi logic thuế lần cuối\
```\
\
**Ví dụ thực tế**: bug production — giá tính sai, không biết ai sửa khi nào. Pickaxe theo tên hàm thuế → thấy ngay commit, tác giả và diff.\
\
**Kết hợp blame**: `git blame src/pricing.ts -L 45,60` xem ai viết dòng 45-60, rồi `git show \u003ccommit\u003e` đọc full context.

## Detailed Answer (EN)
$82
