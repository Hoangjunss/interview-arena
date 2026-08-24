---
id: tokenization-la-gi-bpe-byte-pair-encoding-hoat-dong-ra-sao
position: backend
technology: llm-fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tokenization là gì? BPE (Byte Pair Encoding) hoạt động ra sao?

## Question (EN)
What is tokenization? How does BPE (Byte Pair Encoding) work?

## Đáp án chi tiết (VI)
Tokenization là bước chia text thành đơn vị nhỏ (token) mà model có thể hiểu — có thể là ký tự, subword, hoặc word. LLM hiện đại thường dùng **subword tokenization** vì cân bằng được kích thước vocabulary và khả năng xử lý từ chưa thấy (OOV).\
\
**BPE** bắt đầu với vocabulary là các ký tự đơn lẻ, rồi lặp lại: đếm cặp ký tự/subword liền kề xuất hiện nhiều nhất → gộp (merge) cặp đó thành token mới → thêm vào vocabulary. Lặp cho đến khi đạt kích thước vocab mong muốn (ví dụ 50K). Kết quả: từ phổ biến → 1 token; từ hiếm → nhiều subword token.\
\
Lưu ý thực tế: token không phải là word — \\"`hello`\\" thường là 1 token, \\"`hellloooo`\\" có thể là 3-4 token. Tính **token count** để quản lý context window và chi phí (API tính theo token). Biến thể: **WordPiece** (BERT), **SentencePiece** (dùng ở LLaMA, T5 — xử lý được ngôn ngữ không có khoảng trắng như tiếng Nhật).

## Detailed Answer (EN)
Tokenization splits text into smaller units (tokens) the model can process — characters, subwords, or words. Modern LLMs use **subword tokenization** to balance vocabulary size and handling of unseen (OOV) words.\
\
**BPE** starts with single characters as vocabulary, then iteratively: counts the most frequent adjacent pair → merges that pair into a new token → adds it to the vocabulary. Repeat until the target vocab size is reached (e.g. 50K). Result: common words → 1 token; rare words → multiple subword tokens.\
\
Practical notes: a token is not a word — \\"`hello`\\" is usually 1 token, \\"`hellloooo`\\" could be 3–4. Track **token count** to manage context window and cost (APIs bill per token). Variants: **WordPiece** (BERT), **SentencePiece** (LLaMA, T5 — handles whitespace-less languages like Japanese).
