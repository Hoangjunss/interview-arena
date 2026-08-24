---
id: reanimated-giup-gi-cho-animation-trong-react-native
position: backend
technology: animation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reanimated giúp gì cho animation trong React Native?

## Question (EN)
How does Reanimated help with animation in React Native?

## Đáp án chi tiết (VI)
Vấn đề: animation chạy trên **JS thread** dễ bị giật (jank) khi JS bận (fetch, render list) hoặc phải qua bridge mỗi frame.\
\
Reanimated giải quyết bằng cách chạy animation **trên UI thread**:\
- Dùng **worklet** — hàm JS được đánh dấu để chạy trực tiếp trên UI thread → animation vẫn mượt kể cả khi JS thread bận.\
- API khai báo: `useSharedValue` (giá trị động chia sẻ giữa 2 thread), `useAnimatedStyle` (style tính theo shared value), `withTiming`/`withSpring`.\
- Kết hợp `react-native-gesture-handler` cho tương tác cử chỉ mượt, đạt tới 120fps.\
\
So với `Animated` API sẵn: `Animated` cần `useNativeDriver: true` để chạy native nhưng bị giới hạn (chỉ vài thuộc tính); Reanimated linh hoạt và mạnh hơn cho animation phức tạp/gesture.

## Detailed Answer (EN)
Problem: animations on the **JS thread** stutter (jank) when JS is busy (fetching, rendering lists) or must cross the bridge each frame.\
\
Reanimated solves this by running animations **on the UI thread**:\
- It uses **worklets** — JS functions marked to run directly on the UI thread → animations stay smooth even when the JS thread is busy.\
- Declarative API: `useSharedValue` (an animated value shared across both threads), `useAnimatedStyle` (style derived from shared values), `withTiming`/`withSpring`.\
- Combined with `react-native-gesture-handler` for smooth gesture interactions, up to 120fps.\
\
Vs the built-in `Animated` API: `Animated` needs `useNativeDriver: true` to run natively but is limited (only a few properties); Reanimated is more flexible and powerful for complex animations/gestures.
