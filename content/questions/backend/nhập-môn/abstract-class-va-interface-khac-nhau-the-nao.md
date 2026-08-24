---
id: abstract-class-va-interface-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Abstract class và interface khác nhau thế nào?

## Question (EN)
What is the difference between an abstract class and an interface?

## Đáp án chi tiết (VI)
| | **Abstract class** | **Interface** |\
|---|---|---|\
| Kế thừa | `extends` **1 cái** | `implements` **nhiều** |\
| Constructor | Có | Không |\
| State (instance field) | Có | Không — (chỉ hằng số) |\
| Default method (concrete) | Có | Có — (Java 8+) |\
| Ngữ nghĩa | **\\"is-a\\"** | **\\"can-do\\"** (capability) |\
\
```java\
abstract class Animal {\
  protected String name;                    // có state\
  Animal(String n) { this.name = n; }       // có constructor\
  abstract void speak();\
}\
\
interface Swimmer {\
  void swim();\
  default void rest() { /* ... */ }         // Java 8+\
}\
\
class Duck extends Animal implements Swimmer { /* ... */ }\
```\
\
**Khi nào chọn cái nào:**\
- **Abstract class:** class con cùng một họ + share **state** hoặc cần kiểm soát constructor.\
- **Interface:** định nghĩa **năng lực** mà nhiều class không liên quan đều \\"đeo\\" được (`Comparable`, `Iterable`), hoặc cần đa kế thừa contract.\
\
**Quy tắc:** mặc định ưu tiên **interface**; chỉ chọn abstract class khi cần state chung hoặc constructor.

## Detailed Answer (EN)
$81
