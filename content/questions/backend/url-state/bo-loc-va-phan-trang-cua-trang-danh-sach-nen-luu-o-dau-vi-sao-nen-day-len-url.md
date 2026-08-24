---
id: bo-loc-va-phan-trang-cua-trang-danh-sach-nen-luu-o-dau-vi-sao-nen-day-len-url
position: backend
technology: url-state
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bộ lọc và phân trang của trang danh sách nên lưu ở đâu? Vì sao nên đẩy lên URL?

## Question (EN)
Where should a list page keep its filters and pagination? Why put them in the URL?

## Đáp án chi tiết (VI)
Lưu trên **URL query param**, không phải `useState` hay store global. URL là nơi state đó thuộc về vì nó mô tả \\"user đang xem cái gì\\".\
\
Lợi ích cụ thể:\
- **Chia sẻ được**: copy link gửi đồng nghiệp ra đúng kết quả đã lọc.\
- **F5 không mất**, nút back/forward hoạt động đúng như kỳ vọng.\
- Trở thành một phần **queryKey** của React Query nên cache tự tách theo bộ lọc.\
\
```tsx\
const params = useSearchParams()\
const page = Number(params.get('page') ?? 1)\
const q = params.get('q') ?? ''\
\
const { data } = useQuery({\
  queryKey: ['products', { q, page }],\
  queryFn: () =\u003e fetchProducts({ q, page }),\
})\
```\
\
Hai lưu ý khi triển khai: ô search nên **debounce** rồi mới ghi URL để không tạo hàng chục entry history (dùng `router.replace` thay vì `push` cho thao tác gõ phím); và trong Next.js App Router, component gọi `useSearchParams` cần nằm trong `\u003cSuspense\u003e` để phần còn lại của trang vẫn prerender được.

## Detailed Answer (EN)
Keep them in **URL query params**, not `useState` or a global store. The URL is where that state belongs, because it describes \\"what the user is looking at\\".\
\
Concrete benefits:\
- **Shareable**: copy the link and a colleague lands on the same filtered result.\
- **Survives reload**; back/forward behave as users expect.\
- It becomes part of the React Query **queryKey**, so the cache splits per filter automatically.\
\
```tsx\
const params = useSearchParams()\
const page = Number(params.get('page') ?? 1)\
const q = params.get('q') ?? ''\
\
const { data } = useQuery({\
  queryKey: ['products', { q, page }],\
  queryFn: () =\u003e fetchProducts({ q, page }),\
})\
```\
\
Two implementation notes: **debounce** the search box before writing to the URL so typing does not create dozens of history entries (use `router.replace` instead of `push` for keystrokes); and in the Next.js App Router, a component calling `useSearchParams` must sit inside a `\u003cSuspense\u003e` boundary so the rest of the page can still be prerendered.
