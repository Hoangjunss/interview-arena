---
id: duck-typing-trong-ruby-la-gi-tai-sao-day-la-diem-manh-cua-ngon-ngu
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Duck typing trong Ruby là gì? Tại sao đây là điểm mạnh của ngôn ngữ?

## Question (EN)
What is duck typing in Ruby and why is it considered a strength?

## Đáp án chi tiết (VI)
\\"Nếu nó đi như vịt và kêu như vịt, thì nó là vịt.\\" — Ruby không kiểm tra kiểu của object, chỉ quan tâm object có respond với method được gọi hay không.\
\
**Tại sao mạnh:** viết code generic không cần interface/abstract class; dễ test (mock bất kỳ object nào có method phù hợp); khuyến khích thiết kế theo hành vi chứ không phải phân cấp kế thừa.\
\
Phòng thủ bằng `respond_to?`: `obj.write(\\"data\\") if obj.respond_to?(:write)`.

## Detailed Answer (EN)
\\"If it walks like a duck and quacks like a duck, it's a duck.\\" — Ruby does not check an object's type, only whether it responds to the method being called.\
\
**Why it's powerful:** write generic code without interfaces or abstract classes; easy to mock in tests (any object with the right method works); encourages designing around behaviour, not inheritance hierarchies.\
\
Defensive check: `obj.write(\\"data\\") if obj.respond_to?(:write)`.
