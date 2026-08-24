---
id: lam-the-nao-de-truyen-du-lieu-giua-cac-man-hinh-trong-flutter
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để truyền dữ liệu giữa các màn hình trong Flutter?

## Question (EN)
How do you pass data between screens in Flutter?

## Đáp án chi tiết (VI)
Cách 1 (Navigator cũ): Truyền qua constructor: `Navigator.push(context, MaterialPageRoute(builder: (_) =\u003e DetailPage(item: item)))`. Cách 2 (GoRouter): Dùng path parameter: `route: \\"/detail/:id\\"` và truy cập qua `GoRouterState`. Cách 3 (State Management): Lưu data trong provider/BLoC, truy cập từ bất kỳ màn hình nào. GoRouter với path parameter là sạch nhất và hỗ trợ deep linking.

## Detailed Answer (EN)
Method 1 (old Navigator): pass via constructor in MaterialPageRoute builder. Method 2 (GoRouter): use path parameters and access via `GoRouterState`. Method 3 (State Management): store data in provider/BLoC, access from any screen. GoRouter with path parameters is cleanest and supports deep linking.
