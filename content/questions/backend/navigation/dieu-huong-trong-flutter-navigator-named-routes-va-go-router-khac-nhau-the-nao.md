---
id: dieu-huong-trong-flutter-navigator-named-routes-va-go-router-khac-nhau-the-nao
position: backend
technology: navigation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều hướng trong Flutter: Navigator, named routes và go_router khác nhau thế nào?

## Question (EN)
Flutter navigation: how do Navigator, named routes and go_router differ?

## Đáp án chi tiết (VI)
Flutter điều hướng bằng một **stack các route** do `Navigator` quản lý.\
\
- **Navigator imperative**: `Navigator.push(context, MaterialPageRoute(...))` để mở màn hình,`pop()` để quay lại. Trực tiếp, hợp app đơn giản.\
- **Named routes**: khai báo bảng `routes` rồi `Navigator.pushNamed(context, '/detail')`. Gọn nhưng docs khuyến nghị **không dùng cho app phức tạp** (khó truyền tham số/deep link).\
- **Router API + go_router**: khai báo theo **URL/route declarative**, xử lý tốt deep linking, web history, redirect/guard. Là lựa chọn được khuyến nghị cho app vừa–lớn.\
\
Hay hỏi: khác biệt push vs pushReplacement, truyền dữ liệu qua route và nhận kết quả trả về bằng `await Navigator.push(...)`.

## Detailed Answer (EN)
Flutter navigates via a **stack of routes** managed by `Navigator`.\
\
- **Imperative Navigator**: `Navigator.push(context, MaterialPageRoute(...))` to open a screen, `pop()` to go back. Direct, fine for simple apps.\
- **Named routes**: declare a `routes` table then `Navigator.pushNamed(context, '/detail')`. Compact, but docs **discourage it for complex apps** (harder param passing/deep links).\
- **Router API + go_router**: declares navigation by **URL/route declaratively**, handles deep linking, web history, redirects/guards well. The recommended choice for medium–large apps.\
\
Common asks: push vs pushReplacement, passing data through a route, and getting a return value via `await Navigator.push(...)`.
