---
id: copy-elision-rvo-va-nrvo-trong-c-la-gi-tai-sao-quan-trong
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Copy elision, RVO và NRVO trong C++ là gì? Tại sao quan trọng?

## Question (EN)
What are copy elision, RVO, and NRVO in C++? Why do they matter?

## Đáp án chi tiết (VI)
**Copy elision:** tối ưu hóa của compiler — **loại bỏ hoàn toàn** các lần copy/move không cần thiết khi return object hoặc khởi tạo từ temporary.\
\
**RVO (Return Value Optimization):** khi hàm trả về unnamed temporary, compiler xây dựng trực tiếp vào vị trí đích — không cần copy gì cả.\
\
**NRVO (Named RVO):** tương tự nhưng với biến local có tên:\
\
```cpp\
std::vector\u003cint\u003e makeData() {\
  std::vector\u003cint\u003e result;  // NRVO: compiler xây trực tiếp vào\
  for (int i = 0; i \u003c 1000; ++i) result.push_back(i);\
  return result;             // KHÔNG copy 1000 phần tử\
}\
\
auto data = makeData();  // data được xây in-place từ đầu\
```\
\
**Kể từ C++17:** RVO với prvalue là **bắt buộc** (guaranteed copy elision) — không phụ thuộc compiler nữa. NRVO vẫn là optional optimization.\
\
**Ý nghĩa:** viết code trả về object lớn bằng value thay vì qua pointer/out-param — vừa rõ ràng vừa không kém hiệu năng.

## Detailed Answer (EN)
**Copy elision:** a compiler optimisation that **completely eliminates** unnecessary copies/moves when returning objects or initialising from temporaries.\
\
**RVO (Return Value Optimization):** when a function returns an unnamed temporary, the compiler constructs it directly in the destination — zero copies.\
\
**NRVO (Named RVO):** same but for named local variables:\
\
```cpp\
std::vector\u003cint\u003e makeData() {\
  std::vector\u003cint\u003e result;  // NRVO: compiler builds directly in place\
  for (int i = 0; i \u003c 1000; ++i) result.push_back(i);\
  return result;             // NO copy of 1000 elements\
}\
\
auto data = makeData();  // data is built in-place from the start\
```\
\
**Since C++17:** RVO with prvalues is **mandatory** (guaranteed copy elision) — no longer compiler-dependent. NRVO remains an optional optimisation.\
\
**Takeaway:** returning large objects by value instead of via pointer/out-param is both cleaner and not slower.
