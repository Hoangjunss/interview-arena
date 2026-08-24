---
id: std-thread-va-std-mutex-trong-c-11-cach-tao-thread-va-bao-ve-shared-data
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::thread` và `std::mutex` trong C++11 — cách tạo thread và bảo vệ shared data?

## Question (EN)
How do you use `std::thread` and `std::mutex` in C++11 for thread creation and shared data protection?

## Đáp án chi tiết (VI)
```cpp\
#include \u003cthread\u003e\
#include \u003cmutex\u003e\
\
std::mutex mtx;\
int counter = 0;\
\
void increment(int n) {\
  for (int i = 0; i \u003c n; ++i) {\
    std::lock_guard\u003cstd::mutex\u003e lock(mtx);  // RAII lock\
    ++counter;  // vùng critical section\
  }  // lock tự mở khi ra scope\
}\
\
std::thread t1(increment, 1000);\
std::thread t2(increment, 1000);\
t1.join();  // chờ t1 hoàn thành\
t2.join();  // chờ t2 hoàn thành\
// counter == 2000 — thread-safe\
```\
\
**Các vấn đề cơ bản:**\
\
| Vấn đề | Mô tả | Giải pháp |\
|---|---|---|\
| Race condition | 2 thread cùng read-write shared data | `mutex` |\
| Deadlock | 2 thread chờ nhau mãi | `std::lock()` + lock nhiều mutex cùng lúc |\
| Thread leak | `join()`/`detach()` không được gọi | destructor của `std::thread` gọi `terminate()` |\
\
**`std::lock_guard` vs `std::unique_lock`:** `lock_guard` đơn giản, không unlock sớm được; `unique_lock` linh hoạt hơn (có thể `unlock()`, dùng với condition variable).

## Detailed Answer (EN)
```cpp\
#include \u003cthread\u003e\
#include \u003cmutex\u003e\
\
std::mutex mtx;\
int counter = 0;\
\
void increment(int n) {\
  for (int i = 0; i \u003c n; ++i) {\
    std::lock_guard\u003cstd::mutex\u003e lock(mtx);  // RAII lock\
    ++counter;  // critical section\
  }  // lock released automatically on scope exit\
}\
\
std::thread t1(increment, 1000);\
std::thread t2(increment, 1000);\
t1.join();  // wait for t1 to finish\
t2.join();  // wait for t2 to finish\
// counter == 2000 — thread-safe\
```\
\
**Core issues:**\
\
| Issue | Description | Solution |\
|---|---|---|\
| Race condition | 2 threads concurrently read-write shared data | `mutex` |\
| Deadlock | 2 threads wait on each other forever | `std::lock()` to acquire multiple mutexes atomically |\
| Thread leak | `join()`/`detach()` not called | `std::thread` destructor calls `terminate()` |\
\
**`std::lock_guard` vs `std::unique_lock`:** `lock_guard` is simple, cannot unlock early; `unique_lock` is flexible (supports `unlock()`, works with condition variables).
