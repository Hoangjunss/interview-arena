---
id: deep-linking-la-gi-phan-biet-custom-scheme-app-links-va-universal-links
position: backend
technology: deep-linking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deep linking là gì? Phân biệt custom scheme, App Links và Universal Links?

## Question (EN)
What is deep linking, and how do custom schemes, App Links and Universal Links differ?

## Đáp án chi tiết (VI)
Deep link là URL mở app tới **đúng một màn/nội dung cụ thể** (ví dụ link quảng cáo mở thẳng trang sản phẩm), thay vì chỉ mở màn chính.\
\
Các loại:\
- **Custom URL scheme** (`myapp://product/12`): đơn giản, chạy mọi phiên bản, nhưng **không xác thực** — app khác có thể đăng ký trùng scheme.\
- **Android App Links** (`https://...` đã xác minh qua file `assetlinks.json` trên domain): link https thật, **được xác thực sở hữu domain**, mở thẳng app không hỏi chọn.\
- **iOS Universal Links** (`https://...` qua `apple-app-site-association`): tương đương App Links trên iOS.\
\
Xử lý:\
- Khai báo intent-filter (Android) / associated domains (iOS), rồi map URL → route trong app.\
- Cần lo cả hai trường hợp: app **đang mở** và **chưa chạy** (cold start).\
\
Flutter và React Navigation đều có hỗ trợ deep linking sẵn. Hay hỏi: vì sao App/Universal Links an toàn hơn custom scheme.

## Detailed Answer (EN)
A deep link is a URL that opens an app to **a specific screen/content** (e.g. an ad link opening straight to a product page), rather than just the home screen.\
\
Types:\
- **Custom URL scheme** (`myapp://product/12`): simple, works on all versions, but **unverified** — another app can register the same scheme.\
- **Android App Links** (verified `https://...` via an `assetlinks.json` on the domain): real https links, **domain-ownership verified**, open the app directly without a chooser.\
- **iOS Universal Links** (`https://...` via `apple-app-site-association`): the iOS equivalent of App Links.\
\
Handling:\
- Declare intent-filters (Android) / associated domains (iOS), then map the URL → an in-app route.\
- Handle both cases: app **already open** and **not running** (cold start).\
\
Flutter and React Navigation both support deep linking. Common ask: why App/Universal Links are safer than custom schemes.
