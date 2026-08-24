---
id: loi-16mb-document-size-limit-thuong-xay-ra-khi-nao-va-cach-khac-phuc
position: backend
technology: aggregation
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lỗi \\"16MB document size limit\\" thường xảy ra khi nào và cách khắc phục?

## Question (EN)
When does the \\"16MB document size limit\\" error usually occur and how do you fix it?

## Đáp án chi tiết (VI)
Lỗi này xảy ra khi bạn nhồi một mảng phình mãi không có điểm dừng (unbounded) vào trong một document.\
\
**Ví dụ điển hình:** lưu *tất cả* tin nhắn của một group chat vào một mảng bên trong document group. Chat càng dài, document càng phình, đến lúc chạm trần 16MB là vỡ.\
\
**Cách khắc phục:**\
- **Bucket pattern**: chia thành từng \\"cục\\" chứa tối đa N phần tử (vd 100 tin/bucket).\
- **Reference pattern**: tách hẳn message ra collection `messages` riêng, index theo `groupId`.

## Detailed Answer (EN)
This error happens when you cram an unbounded (ever-growing) array inside a single document.\
\
**Classic example:** storing *all* messages of a group chat in an array inside the group document. The longer the chat, the bigger the document, until it hits the 16MB ceiling and breaks.\
\
**Fix:**\
- **Bucket pattern**: split into \\"buckets\\" holding up to N elements (e.g. 100 messages/bucket).\
- **Reference pattern**: move messages to a separate `messages` collection, indexed by `groupId`.
