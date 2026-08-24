---
id: progressive-web-app-pwa-la-gi
position: backend
technology: html5
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Progressive Web App (PWA) là gì?

## Question (EN)
What is a Progressive Web App (PWA)?

## Đáp án chi tiết (VI)
PWA là web app dùng một nhóm API để đạt trải nghiệm gần app native: **chạy offline, cài được lên màn hình chính, nhận push notification**.\
\
Ba điều kiện bắt buộc:\
1. **HTTPS** — Service Worker chỉ chạy trên secure context (localhost được miễn).\
2. **Service Worker** — proxy nằm giữa app và mạng, cho phép phục vụ từ cache khi mất mạng.\
3. **Web App Manifest** — khai báo tên, icon, màu, chế độ hiển thị.\
\
```json\
{\
  \\"name\\": \\"Luyện Phỏng Vấn IT\\

## Detailed Answer (EN)
A PWA is a web app that uses a set of APIs to get close to a native experience: **works offline, installs to the home screen, receives push notifications**.\
\
Three hard requirements:\
1. **HTTPS** — service workers only run in a secure context (localhost is exempt).\
2. **Service Worker** — a proxy between the app and the network that can serve from cache when offline.\
3. **Web App Manifest** — declares name, icons, colours and display mode.\
\
```json\
{\
  \\"name\\": \\"IT Interview Practice\\
