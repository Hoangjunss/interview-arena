---
id: gan-hoat-dong-the-nao-vai-tro-cua-generator-va-discriminator-la-gi
position: backend
technology: generative-models
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GAN hoạt động thế nào; vai trò của generator và discriminator là gì?

## Question (EN)
How does a GAN work, and what are the roles of the generator and discriminator?

## Đáp án chi tiết (VI)
GAN huấn luyện **hai mạng đối kháng** trong một trò chơi minimax.\
\
- **Generator (G)**: ánh xạ nhiễu ngẫu nhiên `z` thành mẫu giả, cố **đánh lừa** discriminator.\
- **Discriminator (D)**: bộ phân loại phán mẫu là **thật** (từ dữ liệu) hay **giả** (từ G).\
\
Hai mạng học đối kháng: D học phân biệt thật/giả, còn G học tạo mẫu mà D không phân biệt được. Ở điểm tối ưu lý thuyết, phân phối của G trùng phân phối dữ liệu và D xuất ra `0.5` (đoán mò).\
\
**Thách thức huấn luyện:** bất ổn, không hội tụ, **mode collapse** (G chỉ sinh ra một số kiểu mẫu hạn chế), và cần **cân bằng** giữa G với D. Các biến thể (DCGAN, WGAN) cải thiện độ ổn định.

## Detailed Answer (EN)
A GAN trains **two adversarial networks** in a minimax game.\
\
- **Generator (G)**: maps random noise `z` into fake samples, trying to **fool** the discriminator.\
- **Discriminator (D)**: a classifier that judges whether a sample is **real** (from data) or **fake** (from G).\
\
The two train adversarially: D learns to distinguish real from fake, while G learns to produce samples D cannot distinguish. At the theoretical optimum, G's distribution matches the data distribution and D outputs `0.5` (random guessing).\
\
**Training challenges:** instability, non-convergence, **mode collapse** (G produces only a limited variety of samples), and the need to **balance** G against D. Variants (DCGAN, WGAN) improve stability.
