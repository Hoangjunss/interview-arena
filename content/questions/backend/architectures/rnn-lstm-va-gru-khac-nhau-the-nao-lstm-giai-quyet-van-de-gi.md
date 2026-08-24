---
id: rnn-lstm-va-gru-khac-nhau-the-nao-lstm-giai-quyet-van-de-gi
position: backend
technology: architectures
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RNN, LSTM và GRU khác nhau thế nào; LSTM giải quyết vấn đề gì?

## Question (EN)
How do RNN, LSTM, and GRU differ, and what problem does LSTM solve?

## Đáp án chi tiết (VI)
Cả ba xử lý chuỗi bằng cách giữ một **trạng thái ẩn (hidden state)** truyền qua từng bước thời gian.\
\
- **RNN thường**: `h_t = f(W·[h_{t-1}, x_t])`. Đơn giản nhưng gặp **vanishing/exploding gradient** trên chuỗi dài → khó học phụ thuộc xa.\
- **LSTM**: thêm **cell state (bộ nhớ)** và **ba cổng** (forget, input, output) điều tiết việc giữ / ghi / đọc thông tin. Đường cell-state **cộng dồn** cho phép gradient chảy qua rất nhiều bước → học được **phụ thuộc dài hạn**. Đây là vấn đề chính LSTM giải quyết so với RNN thường.\
- **GRU**: bản rút gọn với **hai cổng** (reset, update), gộp cell state và hidden state → ít tham số hơn, hiệu năng thường tương đương, huấn luyện nhanh hơn.\
\
**Chọn:** GRU khi dữ liệu nhỏ / cần nhanh; LSTM khi nó nhỉnh hơn. Cả hai phần lớn đã bị Transformer vượt về phụ thuộc xa, nhưng vẫn dùng nhiều.

## Detailed Answer (EN)
All three process sequences by maintaining a **hidden state** passed from step to step.\
\
- **Vanilla RNN**: `h_t = f(W·[h_{t-1}, x_t])`. Simple but suffers **vanishing/exploding gradients** over long sequences → struggles to learn long-range dependencies.\
- **LSTM**: adds a **cell state (memory)** and **three gates** (forget, input, output) that regulate what to keep / write / read. The **additive** cell-state path lets gradients flow across many steps → it learns **long-term dependencies**. This is the main problem LSTM solves over a vanilla RNN.\
- **GRU**: a simplified version with **two gates** (reset, update) that merges the cell and hidden state → fewer parameters, often comparable performance, faster to train.\
\
**Choosing:** GRU for smaller data / speed; LSTM when it has an edge. Both are largely superseded by Transformers for long-range dependencies but remain widely used.
