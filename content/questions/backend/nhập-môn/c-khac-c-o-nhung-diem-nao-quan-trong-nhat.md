---
id: c-khac-c-o-nhung-diem-nao-quan-trong-nhat
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
C++ khác C ở những điểm nào quan trọng nhất?

## Question (EN)
What are the most important differences between C and C++?

## Đáp án chi tiết (VI)
C++ mở rộng C với:\
- **OOP**: class, kế thừa, đa hình, encapsulation.\
- **Tham chiếu (`\u0026`)**: alias an toàn hơn con trỏ raw.\
- **`new`/`delete`** thay `malloc`/`free` — gọi constructor/destructor.\
- **Templates**: code generic type-safe.\
- **Ngoại lệ (`try/catch`)**: thay if-else kiểm tra lỗi thủ công.\
- **Namespace**: tránh xung đột tên.\
- **STL**: vector, map, algorithm — không cần tự cài.\
\
C vẫn dùng khi cần tối giản (embedded, kernel); C++ dùng khi cần cấu trúc lớn và an toàn hơn.

## Detailed Answer (EN)
C++ extends C with:\
- **OOP**: classes, inheritance, polymorphism, encapsulation.\
- **References (`\u0026`)**: safer aliases than raw pointers.\
- **`new`/`delete`** instead of `malloc`/`free` — invoke constructors/destructors.\
- **Templates**: type-safe generic code.\
- **Exceptions (`try/catch`)**: cleaner error handling.\
- **Namespaces**: prevent name collisions.\
- **STL**: vector, map, algorithms — no need to hand-roll.\
\
C is still preferred for minimal footprint (embedded, kernel); C++ when you need large-scale structure and safety.
