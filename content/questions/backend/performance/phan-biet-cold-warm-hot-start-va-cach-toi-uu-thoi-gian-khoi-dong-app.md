---
id: phan-biet-cold-warm-hot-start-va-cach-toi-uu-thoi-gian-khoi-dong-app
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt cold / warm / hot start và cách tối ưu thời gian khởi động app.

## Question (EN)
Distinguish cold / warm / hot start and how to optimize app startup time.

## Đáp án chi tiết (VI)
Ba trạng thái khởi động khác nhau ở lượng việc hệ thống phải làm:\
\
- **Cold start**: tiến trình chưa tồn tại — hệ thống tạo process, khởi tạo `Application`, rồi dựng Activity đầu tiên. Chậm nhất và là mốc để tối ưu.\
- **Warm start**: process còn sống nhưng Activity phải dựng lại (vd vừa bị đẩy ra khỏi bộ nhớ). Nhanh hơn cold.\
- **Hot start**: Activity vẫn trong bộ nhớ, chỉ đưa lại lên foreground. Nhanh nhất.\
\
**Tối ưu (chủ yếu nhắm cold start):**\
- Giữ `Application.onCreate()` và `Activity.onCreate()` thật gọn; **hoãn** khởi tạo nặng (analytics, SDK) sang sau màn hình đầu.\
- Dùng **App Startup library** để gom và điều phối các initializer thay vì mỗi lib tự chạy `ContentProvider`.\
- Tránh I/O/việc nặng trên main thread lúc khởi động; dùng lazy init.\
- Tối ưu splash: dùng **SplashScreen API**, tránh layout khởi tạo phức tạp.\
- Đo bằng **Macrobenchmark** và theo dõi *startup time* trên Android vitals; cân nhắc **Baseline Profiles** để giảm chi phí JIT lần chạy đầu.

## Detailed Answer (EN)
$88
