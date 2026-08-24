---
id: ref-out-va-in-khac-nhau-the-nao
position: backend
technology: parameters
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ref`, `out` và `in` khác nhau thế nào?

## Question (EN)
How do `ref`, `out`, and `in` differ?

## Đáp án chi tiết (VI)
Cả ba đều truyền tham số **theo tham chiếu** (không copy), khác ở **hướng dữ liệu** và **ràng buộc khởi tạo**:\
\
| Modifier | Init trước khi gọi? | Method phải gán? | Đọc/Ghi trong method |\
|---|---|---|---|\
| `ref` | **Bắt buộc** | Không | Đọc **và** ghi |\
| `out` | Không cần | **Bắt buộc** | Chỉ để **xuất** ra |\
| `in` | **Bắt buộc** | Không (chỉ đọc) | **Chỉ đọc** |\
\
```csharp\
void Swap(ref int a, ref int b) { (a, b) = (b, a); }\
bool TryParse(string s, out int value) { value = 0; /* ... */ return true; }\
double Length(in Vector3 v) =\u003e Math.Sqrt(v.X*v.X + v.Y*v.Y + v.Z*v.Z); // v không sửa được\
```\
\
- **`ref`**: cần truyền vào rồi lấy ra giá trị đã đổi (vd hoán đổi).\
- **`out`**: chỉ để trả nhiều giá trị ra ngoài — kinh điển là mẫu `Try...` (`int.TryParse`).\
- **`in`**: truyền tham chiếu **read-only**, tối ưu khi tham số là **struct lớn** mà không muốn copy và không cho method sửa.

## Detailed Answer (EN)
All three pass a parameter **by reference** (no copy); they differ in **data direction** and **initialization rules**:\
\
| Modifier | Init before call? | Must the method assign? | Read/Write in method |\
|---|---|---|---|\
| `ref` | **Required** | No | Read **and** write |\
| `out` | Not needed | **Required** | **Output** only |\
| `in` | **Required** | No (read-only) | **Read-only** |\
\
```csharp\
void Swap(ref int a, ref int b) { (a, b) = (b, a); }\
bool TryParse(string s, out int value) { value = 0; /* ... */ return true; }\
double Length(in Vector3 v) =\u003e Math.Sqrt(v.X*v.X + v.Y*v.Y + v.Z*v.Z); // v cannot be modified\
```\
\
- **`ref`**: pass a value in and get the modified value back (e.g. a swap).\
- **`out`**: return multiple values out — classic `Try...` pattern (`int.TryParse`).\
- **`in`**: pass a **read-only** reference, an optimization when the parameter is a **large struct** you don't want to copy and the method must not mutate.
