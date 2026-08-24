---
id: composite-pattern-la-gi-khi-nao-dung
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composite pattern là gì? Khi nào dùng?

## Question (EN)
What is the Composite pattern? When should you use it?

## Đáp án chi tiết (VI)
Composite cho phép compose objects thành tree structures để biểu diễn part-whole hierarchies — client xử lý individual objects và compositions đồng nhất qua cùng một interface. \
\
**Ví dụ:** file system:\
```typescript\
interface FileSystemItem {\
  getSize(): number\
}\
\
class File implements FileSystemItem {\
  constructor(private size: number) {}\
  getSize() { return this.size }\
}\
\
class Folder implements FileSystemItem {\
  private children: FileSystemItem[] = []\
  add(item: FileSystemItem) { this.children.push(item) }\
  getSize() {\
    return this.children.reduce((sum, c) =\u003e sum + c.getSize(), 0)\
  }\
}\
```\
Client gọi `getSize()` trên cả File và Folder mà không cần biết loại. Trong React, component tree là ứng dụng tự nhiên của Composite — component con và cha đều là React component. Dùng khi: cần biểu diễn tree hierarchy; khi muốn client treat leaf và composite đồng nhất. Không dùng khi: hierarchy phẳng hoặc interface chung quá generic, khó type-safe.

## Detailed Answer (EN)
$81
