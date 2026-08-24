---
id: autoencoder-va-variational-autoencoder-vae-khac-nhau-ra-sao
position: backend
technology: generative-models
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Autoencoder và Variational Autoencoder (VAE) khác nhau ra sao?

## Question (EN)
How do an autoencoder and a variational autoencoder (VAE) differ?

## Đáp án chi tiết (VI)
- **Autoencoder (AE)**: **encoder** nén đầu vào thành một mã ẩn (latent) chiều thấp, **decoder** tái tạo lại đầu vào; huấn luyện để cực tiểu **sai số tái tạo**. Latent là một **điểm xác định**. Tốt cho nén / khử nhiễu / học đặc trưng, nhưng không gian latent **không có cấu trúc** → lấy mẫu để sinh dữ liệu mới thường không hiệu quả.\
- **VAE**: mang tính **xác suất / sinh mẫu**. Encoder xuất ra **tham số của một phân phối** trên latent (trung bình, phương sai); lấy mẫu qua **reparameterization trick** (`z = μ + σ·ε`) để gradient vẫn chảy được. Hàm mất mát = **tái tạo + KL divergence** kéo latent về gần một **phân phối tiên nghiệm** (chuẩn hóa). KL này khiến không gian latent **liên tục, trơn** → có thể lấy `z` từ phân phối tiên nghiệm rồi decode để **sinh mẫu mới** mạch lạc.\
\
**Khác biệt cốt lõi:** AE = latent xác định để tái tạo; VAE = phân phối trên latent + số hạng KL → mô hình sinh thực thụ.

## Detailed Answer (EN)
- **Autoencoder (AE)**: the **encoder** compresses the input into a low-dimensional latent code, the **decoder** reconstructs the input; it is trained to minimize **reconstruction error**. The latent is a **deterministic point**. Good for compression / denoising / feature learning, but the latent space is **unstructured** → sampling it to generate new data usually does not work well.\
- **VAE**: **probabilistic / generative**. The encoder outputs the **parameters of a distribution** over the latent (mean, variance); you sample via the **reparameterization trick** (`z = μ + σ·ε`) so gradients still flow. The loss = **reconstruction + KL divergence** that pushes the latent toward a **prior** (standard normal). This KL term makes the latent space **continuous and smooth** → you can draw `z` from the prior and decode it to **generate new**, coherent samples.\
\
**Core difference:** AE = a deterministic latent for reconstruction; VAE = a distribution over the latent + a KL term → a true generative model.
