---
id: image-caching-trong-rn-khi-nao-dung-expo-image-fastimage
position: backend
technology: components-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Image caching trong RN — khi nào dùng `expo-image` / `FastImage`?

## Question (EN)
Image caching in RN — when should you reach for `expo-image` / `FastImage`?

## Đáp án chi tiết (VI)
`\u003cImage\u003e` core trong RN có cache **rất cơ bản**: iOS dùng NSURLCache (limit 20MB default), Android dùng OkHttp memory cache. Không có disk cache mạnh, không có placeholder/blur, không có priority queue. Hậu quả: list ảnh lớn → reload từ network khi user scroll lên/xuống nhiều lần, RAM spike.\
\
**`expo-image` (recommended 2026)**:\
- Dùng SDWebImage (iOS) + Glide (Android) bên dưới — cache mạnh, disk + memory.\
- Hỗ trợ `placeholder` (blurhash, thumbnail), `transition`, `contentFit` (như CSS object-fit).\
- Hỗ trợ format mới: AVIF, WebP, GIF, animated WebP.\
- Cài qua Expo (dùng được cả bare workflow).\
\
**`react-native-fast-image`** (lib cũ hơn): cũng dùng SDWebImage/Glide, có priority/headers/cache control. Maintain chậm dần khi expo-image phổ biến.\
\
Khi nào dùng image core: ảnh local nhỏ (icon, logo). Khi nào nâng cấp: bất kỳ list/feed/gallery có ảnh remote \u003e50 items, hoặc cần placeholder để chống layout shift.

## Detailed Answer (EN)
RN core `\u003cImage\u003e` has very **basic** caching: iOS uses NSURLCache (default 20 MB cap), Android uses OkHttp's memory cache. There is no strong disk cache, no placeholder/blur, no priority queue. Result: a large image list reloads from the network when the user scrolls back and forth, with RAM spikes.\
\
**`expo-image` (recommended 2026):**\
- Uses SDWebImage (iOS) + Glide (Android) under the hood — strong disk + memory cache.\
- Supports `placeholder` (blurhash, thumbnail), `transition`, `contentFit` (like CSS `object-fit`).\
- Modern formats: AVIF, WebP, GIF, animated WebP.\
- Installs via Expo (also works in bare workflow).\
\
**`react-native-fast-image`** (older library): also uses SDWebImage/Glide, with priority/headers/cache controls. Maintenance has slowed as expo-image takes over.\
\
When the core component is fine: small local assets (icons, logos). When to upgrade: any list/feed/gallery with \u003e50 remote images, or whenever you need a placeholder to prevent layout shift.
