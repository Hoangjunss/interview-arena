---
id: cross-platform-flutter-react-native-va-native-khac-nhau-ra-sao-khi-nao-chon-cai
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cross-platform (Flutter, React Native) và native khác nhau ra sao? Khi nào chọn cái nào?

## Question (EN)
How do cross-platform (Flutter, React Native) and native differ, and when do you pick each?

## Đáp án chi tiết (VI)
Cùng hướng tới app iOS + Android nhưng khác cách tiếp cận:\
\
- **Native** (Kotlin/Compose cho Android, Swift/SwiftUI cho iOS): hiệu năng và truy cập API nền tảng tốt nhất, theo sát tính năng mới nhất, UX chuẩn hệ điều hành. Đổi lại **viết hai lần**, cần hai bộ kỹ năng.\
- **React Native**: viết bằng JS/TS + React, render **component native thật**; tái dùng nhân sự web, hệ sinh thái npm lớn. Việc rất nặng/đặc thù có thể cần native module.\
- **Flutter**: viết bằng Dart, **tự vẽ UI bằng engine riêng** (Skia/Impeller) → nhất quán giữa nền tảng, hiệu năng cao. Kích thước app lớn hơn, phải học Dart.\
\
Chọn theo: yêu cầu hiệu năng/đồ họa, mức dùng API native đặc thù, kỹ năng đội ngũ, tốc độ ra thị trường và ngân sách bảo trì một hay hai codebase.\
\
Hay hỏi: đánh đổi giữa một codebase (nhanh, rẻ) và tối ưu native sâu.

## Detailed Answer (EN)
All target iOS + Android apps but differ in approach:\
\
- **Native** (Kotlin/Compose for Android, Swift/SwiftUI for iOS): best performance and platform-API access, closest to the newest features, OS-standard UX. In exchange you **write twice** and need two skill sets.\
- **React Native**: write in JS/TS + React, rendering **real native components**; reuse web talent, huge npm ecosystem. Very heavy/specialized work may need a native module.\
- **Flutter**: write in Dart, **drawing the UI with its own engine** (Skia/Impeller) → cross-platform consistency and high performance. Larger app size, must learn Dart.\
\
Choose by: performance/graphics needs, how much platform-specific native API you use, team skills, time-to-market, and the budget to maintain one vs two codebases.\
\
Common ask: the trade-off between a single codebase (fast, cheap) and deep native optimization.
