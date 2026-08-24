---
id: revalidatepath-va-revalidatetag-khac-nhau-the-nao-va-khi-nao-chon-cai-nao-sau-mo
position: backend
technology: caching---revalidation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`revalidatePath` và `revalidateTag` khác nhau thế nào, và khi nào chọn cái nào sau một mutation?

## Question (EN)
How do `revalidatePath` and `revalidateTag` differ, and when do you pick each after a mutation?

## Đáp án chi tiết (VI)
Cả hai làm mới Data Cache trên server sau khi data đổi (thường gọi trong Server Action / Route Handler). Khác nhau ở **đơn vị nhắm tới**.\
\
**`revalidatePath(path)`** — làm mới cache theo **đường dẫn route**.\
```ts\
revalidatePath('/blog')          // làm mới đúng trang /blog\
revalidatePath('/blog/[slug]', 'page')  // mọi trang khớp dynamic segment\
```\
Dùng khi bạn biết rõ trang nào bị ảnh hưởng và nó tập trung ở một (vài) route.\
\
**`revalidateTag(tag)`** — làm mới mọi `fetch` đã gắn tag đó, **bất kể nằm ở route nào**.\
```ts\
await fetch(url, { next: { tags: ['products'] } })\
// sau khi sửa sản phẩm:\
revalidateTag('products')   // mọi nơi fetch 'products' đều mới\
```\
Dùng khi cùng một loại data xuất hiện ở **nhiều route rải rác** (list, detail, sidebar) — chỉ một lệnh là đồng bộ hết.\
\
**Quy tắc chọn:** ảnh hưởng theo **trang** → `revalidatePath`; ảnh hưởng theo **loại data dùng chung khắp nơi** → `revalidateTag`. **Lưu ý:** cả hai vô hiệu cache nhưng không re-render ngay; trang sẽ regenerate ở request kế tiếp.

## Detailed Answer (EN)
$85
