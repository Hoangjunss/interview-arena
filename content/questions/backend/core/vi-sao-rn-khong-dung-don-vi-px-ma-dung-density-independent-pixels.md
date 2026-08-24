---
id: vi-sao-rn-khong-dung-don-vi-px-ma-dung-density-independent-pixels
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao RN không dùng đơn vị `px` mà dùng \\"density-independent pixels\\"?

## Question (EN)
Why does RN use density-independent pixels instead of `px`?

## Đáp án chi tiết (VI)
Số trong `style: { width: 100 }` không phải physical pixel — đó là **DIP** (density-independent pixel), tương tự `dp` Android hay `pt` iOS. RN tự nhân với `PixelRatio.get()` để ra physical pixel khi render.\
\
Ví dụ trên iPhone 14 (3x density), `width: 100` thật sự là `300` physical pixel; trên màn 1x là `100`. Mục đích: cùng một số → kích thước **vật lý** ngang nhau giữa các màn hình mật độ khác nhau, để UI không bị tí hon trên màn 4K hay khổng lồ trên màn cũ.\
\
Thông tin liên quan:\
- `PixelRatio.get()` trả 1, 1.5, 2, 2.5, 3, 3.5, 4 tùy device.\
- `PixelRatio.getPixelSizeForLayoutSize(100)` chuyển DIP → physical pixel (cần khi gọi native API yêu cầu pixel thật, vd Canvas).\
- `StyleSheet.hairlineWidth` là 1 physical pixel — dùng cho border mảnh (`borderBottomWidth: StyleSheet.hairlineWidth`).\
- Image asset gắn `@2x`/`@3x` để Metro pick đúng độ phân giải theo density.

## Detailed Answer (EN)
A number in `style: { width: 100 }` is not a physical pixel — it is a **DIP** (density-independent pixel), similar to Android `dp` or iOS `pt`. RN multiplies by `PixelRatio.get()` to produce physical pixels at render time.\
\
Example: on an iPhone 14 (3x density), `width: 100` is actually `300` physical pixels; on a 1x screen it is `100`. Goal: the same number → the same **physical** size across densities, so UI is not tiny on 4K and gigantic on legacy screens.\
\
Related APIs:\
- `PixelRatio.get()` returns 1, 1.5, 2, 2.5, 3, 3.5, 4 depending on device.\
- `PixelRatio.getPixelSizeForLayoutSize(100)` converts DIP to physical pixels (needed when calling a native API that wants real pixels, e.g. Canvas).\
- `StyleSheet.hairlineWidth` equals 1 physical pixel — for thin borders (`borderBottomWidth: StyleSheet.hairlineWidth`).\
- Image assets use `@2x`/`@3x` so Metro picks the correct resolution per density.
