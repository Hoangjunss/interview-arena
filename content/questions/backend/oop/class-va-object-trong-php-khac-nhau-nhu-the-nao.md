---
id: class-va-object-trong-php-khac-nhau-nhu-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Class và Object trong PHP khác nhau như thế nào?

## Question (EN)
What are classes and objects in PHP? What's the difference?

## Đáp án chi tiết (VI)
Class là bản thiết kế (blueprint) định nghĩa thuộc tính và phương thức, còn Object là một thực thể cụ thể được tạo ra từ class đó. Hãy nghĩ class như khuôn bánh và object như những chiếc bánh thực sự. Khai báo class: `class User { public $name; public function getName() { return $this-\u003ename; } }`. Tạo object: `$user = new User();`. Mỗi object có bản sao thuộc tính riêng nhưng chia sẻ chung phần code của phương thức.

## Detailed Answer (EN)
A class is a blueprint or template defining properties (attributes) and methods (functions). An object is a specific instance created from the class. Think of class like a cookie cutter and objects like the actual cookies. Define a class with `class User { public $name; public function getName() { return $this-\u003ename; } }`. Create an object with `$user = new User();`. Each object has its own copy of properties but shares method code.
