---
id: match-trong-php-8-khac-switch-o-nhung-diem-nao
position: backend
technology: php-8
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`match` trong PHP 8 khác `switch` ở những điểm nào?

## Question (EN)
How does PHP 8's `match` differ from `switch`?

## Đáp án chi tiết (VI)
Bốn khác biệt cần nêu được:\
\
1. **So sánh nghiêm ngặt.** `match` dùng `===`, `switch` dùng `==`. Đây là điểm hay bị hỏi lại.\
2. **Là biểu thức (expression).** `match` **trả về giá trị**, gán thẳng vào biến hoặc `return` được. `switch` là câu lệnh.\
3. **Không fall-through.** Không cần `break`; mỗi nhánh là **một biểu thức duy nhất**.\
4. **Không khớp thì ném lỗi.** Nếu không nhánh nào khớp và không có `default`, PHP ném `UnhandledMatchError` thay vì im lặng bỏ qua như `switch`.\
\
```php\
$status = '1';\
\
switch ($status) {\
    case 1: $label = 'paid'; break;    // trúng: '1' == 1\
    default: $label = 'unknown';\
}\
\
$label = match ($status) {\
    1 =\u003e 'paid',                        // KHÔNG trúng: '1' !== 1\
    default =\u003e 'unknown',\
};\
```\
\
Có thể gom nhiều giá trị vào một nhánh: `1, 2 =\u003e 'active'`. Dùng `match (true)` khi cần điều kiện thay vì so khớp giá trị. Mặc định nên chọn `match`; chỉ giữ `switch` khi một nhánh cần chạy **nhiều câu lệnh**.

## Detailed Answer (EN)
Four differences worth naming:\
\
1. **Strict comparison.** `match` uses `===`, `switch` uses `==`. This is the follow-up interviewers push on.\
2. **It is an expression.** `match` **returns a value**, so you can assign or `return` it directly. `switch` is a statement.\
3. **No fall-through.** No `break` needed; each arm is **a single expression**.\
4. **No match throws.** With no matching arm and no `default`, PHP throws `UnhandledMatchError` instead of silently doing nothing like `switch`.\
\
```php\
$status = '1';\
\
switch ($status) {\
    case 1: $label = 'paid'; break;    // matches: '1' == 1\
    default: $label = 'unknown';\
}\
\
$label = match ($status) {\
    1 =\u003e 'paid',                        // does NOT match: '1' !== 1\
    default =\u003e 'unknown',\
};\
```\
\
Multiple values can share an arm: `1, 2 =\u003e 'active'`. Use `match (true)` when you need conditions rather than value equality. Prefer `match` by default; keep `switch` only when one branch must run **several statements**.
