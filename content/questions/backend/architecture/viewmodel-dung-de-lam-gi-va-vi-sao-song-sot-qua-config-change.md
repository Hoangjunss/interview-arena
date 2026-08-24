---
id: viewmodel-dung-de-lam-gi-va-vi-sao-song-sot-qua-config-change
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ViewModel dùng để làm gì và vì sao sống sót qua config change?

## Question (EN)
What is a ViewModel for and why does it survive config changes?

## Đáp án chi tiết (VI)
`ViewModel` là **nơi giữ state cấp màn hình + business logic**, tách khỏi UI (Activity/Fragment/Composable).\
\
Vì sao quan trọng:\
- Nó **sống sót qua config change** (xoay màn hình) vì được gắn với `ViewModelStoreOwner`, không bị hủy–tạo lại theo Activity/Fragment → không phải fetch lại dữ liệu, không mất state.\
- Chỉ bị dọn khi owner thực sự biến mất (`onCleared()`); dùng `SavedStateHandle` để chống mất dữ liệu khi process bị kill.\
\
Nguyên tắc:\
- ViewModel **không giữ tham chiếu tới Context/View/Activity** (rò rỉ bộ nhớ).\
- Expose state qua `StateFlow`/`LiveData` cho UI quan sát.\
\
Hay hỏi: khác nhau giữa `onSaveInstanceState` và ViewModel (ViewModel giữ object lớn trong RAM; saved-state giữ dữ liệu nhỏ, sống qua process death).

## Detailed Answer (EN)
`ViewModel` is where you keep **screen-level state + business logic**, separate from the UI (Activity/Fragment/Composable).\
\
Why it matters:\
- It **survives config changes** (rotation) because it is scoped to a `ViewModelStoreOwner`, not destroyed/recreated with the Activity/Fragment → no re-fetching, no lost state.\
- It is cleared only when the owner truly goes away (`onCleared()`); use `SavedStateHandle` to guard against process death.\
\
Rules:\
- A ViewModel **must not hold a Context/View/Activity reference** (memory leak).\
- Expose state via `StateFlow`/`LiveData` for the UI to observe.\
\
Common ask: `onSaveInstanceState` vs ViewModel (ViewModel keeps large objects in RAM; saved-state keeps small data and survives process death).
