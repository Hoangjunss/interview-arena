---
id: phan-biet-xac-thuc-bang-session-cookie-va-bang-token-jwt
position: backend
technology: auth-\u0026-token
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt xác thực bằng session (cookie) và bằng token (JWT)?

## Question (EN)
Session (cookie) vs token (JWT) authentication — what is the difference?

## Đáp án chi tiết (VI)
**Session**: server lưu trạng thái phiên trong store; client chỉ giữ **session id** trong cookie; mỗi request server tra store để xác thực. → **Thu hồi tức thì**, nhưng stateful (cần shared store khi scale nhiều instance).\
\
**Token (JWT)**: server ký token chứa claim, client gửi kèm mỗi request; server chỉ **verify chữ ký** mà không tra DB (**stateless**). → Dễ scale, hợp API/microservice/mobile, nhưng **khó thu hồi trước hạn** (phải blacklist, hoặc dùng access token sống ngắn + refresh).\
\
Cookie-session hợp app render server truyền thống; JWT hợp SPA/mobile gọi API cross-service.

## Detailed Answer (EN)
**Session**: the server stores session state in a store; the client only holds a **session id** in a cookie; every request the server looks up the store to authenticate. → **Instant revocation**, but stateful (needs a shared store when scaling across instances).\
\
**Token (JWT)**: the server signs a token containing claims, the client sends it with every request; the server only **verifies the signature** without a DB lookup (**stateless**). → Scales easily, fits APIs/microservices/mobile, but is **hard to revoke early** (needs a blacklist, or a short-lived access token + refresh).\
\
Cookie-sessions suit traditional server-rendered apps; JWTs suit SPAs/mobile calling cross-service APIs.
