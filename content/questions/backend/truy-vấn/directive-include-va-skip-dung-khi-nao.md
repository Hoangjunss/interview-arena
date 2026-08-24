---
id: directive-include-va-skip-dung-khi-nao
position: backend
technology: truy-vấn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Directive include và skip dùng khi nào?

## Question (EN)
When are the include and skip directives used?

## Đáp án chi tiết (VI)
Chúng **bật tắt một phần truy vấn theo giá trị biến**, nên cùng một document phục vụ được nhiều trường hợp. Điều này quan trọng với persisted query, nơi số lượng document khác nhau cần được giữ ở mức tối thiểu.\
\
```graphql\
query Feed($withAuthor: Boolean!, $skipBody: Boolean!) {\
  feed {\
    title\
    body   @skip(if: $skipBody)\
    author @include(if: $withAuthor) { name }\
  }\
}\
```\
\
Chỉ thị chia hai nhóm: nhóm dùng trong truy vấn của client như bật tắt field; và nhóm dùng trong schema như đánh dấu field không dùng nữa hoặc mô tả quy tắc phân quyền, cache.\
\
Chỉ thị tuỳ chỉnh ở schema là công cụ mạnh nhưng dễ bị lạm dụng: đưa quá nhiều logic vào đó khiến hành vi bị giấu khỏi mã và khó theo dõi khi gỡ lỗi.\
\
Một lưu ý khi dùng directive bật tắt: field bị tắt **biến mất khỏi phản hồi** thay vì trả về null, nên client phải xử lý được cả hai trạng thái, và với normalized cache điều này ảnh hưởng tới việc ghi đè dữ liệu đã có.

## Detailed Answer (EN)
They **toggle part of a query based on a variable**, so one document serves several cases. That matters with persisted queries, where the number of distinct documents should stay minimal.\
\
```graphql\
query Feed($withAuthor: Boolean!, $skipBody: Boolean!) {\
  feed {\
    title\
    body   @skip(if: $skipBody)\
    author @include(if: $withAuthor) { name }\
  }\
}\
```\
\
Directives fall into two groups: those used in client queries such as conditional inclusion; and those in the schema such as deprecation markers or descriptions of authorisation and caching rules.\
\
Custom schema directives are powerful but easily overused: too much logic there hides behaviour from the code and complicates debugging.\
\
A usage note: an excluded field **disappears from the response** rather than returning null, so clients must handle both states, and with a normalized cache this affects whether existing cached data is overwritten.
