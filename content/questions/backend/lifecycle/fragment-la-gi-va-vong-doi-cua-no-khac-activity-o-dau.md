---
id: fragment-la-gi-va-vong-doi-cua-no-khac-activity-o-dau
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fragment là gì và vòng đời của nó khác Activity ở đâu?

## Question (EN)
What is a Fragment and how does its lifecycle differ from an Activity?

## Đáp án chi tiết (VI)
Fragment là **thành phần UI tái sử dụng có vòng đời riêng**, sống bên trong Activity (hoặc Fragment khác) — dùng để chia UI thành phần nhỏ và hỗ trợ layout đa kích thước (điện thoại/tablet).\
\
Khác biệt chính:\
- Fragment có thêm các callback quanh **View**: `onCreateView()` (tạo view), `onViewCreated()`, `onDestroyView()` — vì view của fragment có thể bị hủy trong khi **instance fragment vẫn sống** (ví dụ khi vào back stack).\
- Vì vậy phải phân biệt **vòng đời của fragment** và **vòng đời của view fragment**; nên quan sát dữ liệu bằng `viewLifecycleOwner` để tránh rò rỉ.\
- Fragment gắn/ tách qua `onAttach()`/`onDetach()` và được quản lý bởi `FragmentManager`.\
\
Hay hỏi: vì sao dùng `viewLifecycleOwner` thay vì `this` khi observe LiveData trong Fragment.

## Detailed Answer (EN)
A Fragment is a **reusable UI component with its own lifecycle**, living inside an Activity (or another Fragment) — used to split the UI into pieces and support multi-size layouts (phone/tablet).\
\
Key differences:\
- Fragments add **view-related** callbacks: `onCreateView()` (create the view), `onViewCreated()`, `onDestroyView()` — because a fragment's view can be destroyed while the **fragment instance stays alive** (e.g. on the back stack).\
- So you must distinguish the **fragment lifecycle** from the **fragment's view lifecycle**; observe data with `viewLifecycleOwner` to avoid leaks.\
- Fragments attach/detach via `onAttach()`/`onDetach()` and are managed by the `FragmentManager`.\
\
Common ask: why use `viewLifecycleOwner` instead of `this` when observing LiveData in a Fragment.
