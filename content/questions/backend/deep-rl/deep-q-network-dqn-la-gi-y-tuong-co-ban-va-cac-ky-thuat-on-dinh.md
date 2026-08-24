---
id: deep-q-network-dqn-la-gi-y-tuong-co-ban-va-cac-ky-thuat-on-dinh
position: backend
technology: deep-rl
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deep Q-Network (DQN) là gì? Ý tưởng cơ bản và các kỹ thuật ổn định.

## Question (EN)
What is a Deep Q-Network (DQN)? The core idea and its stabilizing tricks.

## Đáp án chi tiết (VI)
**DQN** (Mnih và cộng sự) dùng **mạng nơ-ron sâu** để xấp xỉ hàm giá trị hành động `Q(s,a; θ)`, cho phép Q-Learning hoạt động trên không gian trạng thái lớn/thô như **pixel ảnh** (chơi game Atari từ frame màn hình).\
\
Vấn đề: kết hợp Q-Learning với xấp xỉ hàm phi tuyến vốn **không ổn định / dễ phân kỳ**. DQN giải quyết bằng hai kỹ thuật chính:\
- **Experience Replay** — lưu các chuyển tiếp `(s, a, r, s′)` vào bộ nhớ, huấn luyện trên **mini-batch lấy mẫu ngẫu nhiên** từ đó. Việc này phá **tương quan thời gian** giữa các mẫu liên tiếp và tái sử dụng dữ liệu hiệu quả hơn.\
- **Target Network** — dùng một bản sao mạng `θ⁻` **đóng băng** để tính target `r + γ·max_a′ Q(s′,a′; θ⁻)`, chỉ đồng bộ định kỳ. Giữ target ổn định, tránh \\"đuổi theo mục tiêu di động\\".\
\
Hàm loss là bình phương sai TD:\
\
`L(θ) = E[ ( r + γ·max_a′ Q(s′,a′; θ⁻) − Q(s,a; θ) )² ]`\
\
DQN chỉ dùng cho **hành động rời rạc**. Cải tiến sau: Double DQN (giảm overestimation), Dueling DQN, Prioritized Replay, Rainbow.

## Detailed Answer (EN)
$88
