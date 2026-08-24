---
id: chon-embedding-model-cho-rag-dua-tren-tieu-chi-nao
position: backend
technology: rag-\u0026-retrieval
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn embedding model cho RAG dựa trên tiêu chí nào?

## Question (EN)
What criteria pick an embedding model for RAG?

## Đáp án chi tiết (VI)
Embedding model biến text thành vector; chọn sai ảnh hưởng trực tiếp chất lượng retrieval. Các tiêu chí:\
\
1. **Chất lượng retrieval trên tác vụ của bạn** — tham khảo **MTEB leaderboard** (đặc biệt nhóm *Retrieval*), nhưng **luôn eval lại trên dữ liệu thật của mình** vì benchmark chung không đại diện domain.\
2. **Đa ngôn ngữ** — nếu có tiếng Việt, chọn model multilingual (vd multilingual-e5, BGE-M3) thay vì model chỉ English.\
3. **Số chiều (dimension)** — chiều cao (1536, 3072) thường chất lượng hơn nhưng tốn storage và RAM vector DB hơn; một số model hỗ trợ **Matryoshka** để cắt chiều linh hoạt.\
4. **Độ dài context tối đa** của embedding — phải chứa được chunk của bạn (512 vs 8192 token).\
5. **Chi phí \u0026 triển khai** — API (OpenAI `text-embedding-3`, Cohere, Voyage) tiện nhưng tính phí và gửi dữ liệu ra ngoài; open-source (E5, BGE, GTE) tự host, kiểm soát dữ liệu.\
6. **Tính nhất quán** — query và document phải **cùng một model** (và cùng distance metric); đổi model bắt buộc re-embed toàn bộ index.

## Detailed Answer (EN)
$86
