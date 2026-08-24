---
id: bridge-cu-va-jsi-trong-react-native-khac-nhau-the-nao
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bridge cũ và JSI trong React Native khác nhau thế nào?

## Question (EN)
What is the difference between the old bridge and JSI in React Native?

## Đáp án chi tiết (VI)
RN chạy JavaScript trên một thread riêng, tách khỏi UI/native thread; cách hai bên nói chuyện là điểm mấu chốt.\
\
- **Bridge (kiến trúc cũ)**: mọi lời gọi JS ↔ native đi qua một cầu **bất đồng bộ**, message phải **serialize thành JSON** theo lô (batch). Hệ quả: có độ trễ, không gọi đồng bộ được, dễ nghẽn khi lưu lượng lớn (list dài, animation).\
- **JSI (JavaScript Interface, kiến trúc mới)**: lớp C++ cho JS **giữ tham chiếu trực tiếp** tới đối tượng native và gọi **đồng bộ**, **không serialize JSON**. Nhờ đó nhanh hơn và mở đường cho Fabric + TurboModules.\
\
Ý chính: JSI loại bỏ nút cổ chai serialize của bridge, cho phép tương tác native tức thời khi cần.

## Detailed Answer (EN)
RN runs JavaScript on a separate thread, apart from the UI/native thread; how the two sides talk is the crux.\
\
- **Bridge (old architecture)**: every JS ↔ native call crosses an **asynchronous** bridge, with messages **serialized to JSON** in batches. Consequences: latency, no synchronous calls, and congestion under heavy traffic (long lists, animations).\
- **JSI (JavaScript Interface, new architecture)**: a C++ layer that lets JS **hold direct references** to native objects and call them **synchronously**, with **no JSON serialization**. This is faster and enables Fabric + TurboModules.\
\
Key point: JSI removes the bridge's serialization bottleneck, allowing instant native interaction when needed.
