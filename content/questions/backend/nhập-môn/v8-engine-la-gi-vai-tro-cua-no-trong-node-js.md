---
id: v8-engine-la-gi-vai-tro-cua-no-trong-node-js
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
V8 engine là gì? Vai trò của nó trong Node.js?

## Question (EN)
What is the V8 engine? What role does it play in Node.js?

## Đáp án chi tiết (VI)
V8 dùng JIT compilation biên dịch JS thành native machine code — hidden class optimization cho phép objects cùng shape dùng chung internal class và chạy nhanh hơn. V8 là JavaScript engine mã nguồn mở của Google viết bằng C++, được dùng trong Chrome và là trái tim của Node.js. Điểm khác biệt quan trọng: V8 không interpret JS từng dòng mà dùng JIT (Just-In-Time) compilation — biên dịch JS thành native machine code ngay lúc chạy, cho tốc độ nhanh gần bằng C++. Node.js nhúng V8 vào C++ runtime và bổ sung thêm libuv (async I/O), các built-in modules (fs, http, crypto...) để tạo thành môi trường chạy JS hoàn chỉnh ngoài browser. Thực tế ảnh hưởng đến dev: V8 có hidden class optimization — object có cùng shape (thứ tự properties) sẽ dùng chung internal class và chạy nhanh hơn, nên tránh thêm properties động vào object sau khi tạo trong hot paths.

## Detailed Answer (EN)
V8 uses JIT compilation to convert JS to native machine code — hidden class optimization lets objects with the same shape share an internal class and run faster. V8 is Google's open-source JavaScript engine written in C++, used in Chrome and at the heart of Node.js. The key distinction: V8 does not interpret JS line by line — it uses JIT (Just-In-Time) compilation, compiling JS into native machine code at runtime, achieving speeds close to C++. Node.js embeds V8 into a C++ runtime and adds libuv (async I/O) and built-in modules (fs, http, crypto...) to create a complete JS execution environment outside the browser. Practical impact for developers: V8 uses hidden class optimization — objects with the same shape (same property order) share an internal class and run faster. Avoid dynamically adding properties to objects after creation in hot code paths.
