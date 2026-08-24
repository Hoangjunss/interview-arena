---
id: 4-loai-type-casting-trong-c-static-cast-dynamic-cast-reinterpret-cast-const-cast
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
4 loại type casting trong C++ (`static_cast`, `dynamic_cast`, `reinterpret_cast`, `const_cast`) — mỗi loại dùng khi nào?

## Question (EN)
When should you use each of the four C++ casts: `static_cast`, `dynamic_cast`, `reinterpret_cast`, `const_cast`?

## Đáp án chi tiết (VI)
| Cast | Thời điểm | Dùng khi |\
|---|---|---|\
| `static_cast` | compile-time | chuyển đổi an toàn: int→double, upcast, void*→T* |\
| `dynamic_cast` | runtime (RTTI) | downcast qua hierarchy — trả `nullptr`/throw nếu sai kiểu |\
| `reinterpret_cast` | compile-time | tái diễn giải raw bit — pointer↔integer, hoàn toàn unsafe |\
| `const_cast` | compile-time | thêm/bỏ `const`/`volatile` — chỉ hợp lệ khi object gốc không const |\
\
```cpp\
// static_cast\
double x = static_cast\u003cdouble\u003e(42);\
\
// dynamic_cast — cần virtual function trong hierarchy\
Base* b = new Derived();\
Derived* d = dynamic_cast\u003cDerived*\u003e(b);  // d != nullptr nếu đúng kiểu\
\
// const_cast\
void print(char* s) { std::cout \u003c\u003c s; }\
const char* cs = \\"hello\\";\
print(const_cast\u003cchar*\u003e(cs));  // bỏ const để gọi legacy API\
```\
\
**Ưu tiên:** `static_cast` trước tiên; tránh `reinterpret_cast` và `const_cast` trừ khi thực sự cần.

## Detailed Answer (EN)
| Cast | Timing | Use when |\
|---|---|---|\
| `static_cast` | compile-time | safe conversions: int→double, upcast, void*→T* |\
| `dynamic_cast` | runtime (RTTI) | downcast through hierarchy — returns `nullptr`/throws on wrong type |\
| `reinterpret_cast` | compile-time | raw bit reinterpretation — pointer↔integer, completely unsafe |\
| `const_cast` | compile-time | add/remove `const`/`volatile` — only valid if original object isn't const |\
\
```cpp\
// static_cast\
double x = static_cast\u003cdouble\u003e(42);\
\
// dynamic_cast — requires virtual function in hierarchy\
Base* b = new Derived();\
Derived* d = dynamic_cast\u003cDerived*\u003e(b);  // d != nullptr if correct type\
\
// const_cast\
void print(char* s) { std::cout \u003c\u003c s; }\
const char* cs = \\"hello\\";\
print(const_cast\u003cchar*\u003e(cs));  // strip const for legacy API\
```\
\
**Preference order:** `static_cast` first; avoid `reinterpret_cast` and `const_cast` unless truly necessary.
