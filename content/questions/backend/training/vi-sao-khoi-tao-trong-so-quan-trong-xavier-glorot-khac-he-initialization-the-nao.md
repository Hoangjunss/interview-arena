---
id: vi-sao-khoi-tao-trong-so-quan-trong-xavier-glorot-khac-he-initialization-the-nao
position: backend
technology: training
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao khởi tạo trọng số quan trọng; Xavier/Glorot khác He initialization thế nào?

## Question (EN)
Why does weight initialization matter, and how does Xavier/Glorot differ from He initialization?

## Đáp án chi tiết (VI)
Khởi tạo tồi làm hỏng huấn luyện:\
\
- **Toàn số 0** → mọi nơ-ron giống hệt nhau, đối xứng không bao giờ bị phá vỡ.\
- **Quá lớn** → activation/gradient **phồng lên**.\
- **Quá nhỏ** → activation/gradient **teo lại**.\
\
Khởi tạo tốt giữ **phương sai của activation và gradient gần như không đổi qua các lớp**.\
\
- **Xavier/Glorot**: đặt phương sai trọng số theo cả fan-in và fan-out (`Var = 2/(n_in + n_out)`). Suy ra với giả định activation tuyến tính/đối xứng → thiết kế cho **sigmoid/tanh**.\
- **He initialization**: phương sai `2/n_in`. Tính đến việc **ReLU đưa khoảng một nửa đầu vào về 0** (làm giảm nửa phương sai), nên dùng thang lớn hơn → lựa chọn đúng cho mạng **ReLU và biến thể**.\
\
**Quy tắc:** tanh/sigmoid → Xavier; họ ReLU → He.

## Detailed Answer (EN)
Bad initialization breaks training:\
\
- **All zeros** → every neuron is identical and the symmetry never breaks.\
- **Too large** → activations/gradients **explode**.\
- **Too small** → activations/gradients **vanish**.\
\
Good initialization keeps the **variance of activations and gradients roughly constant across layers**.\
\
- **Xavier/Glorot**: sets the weight variance from both fan-in and fan-out (`Var = 2/(n_in + n_out)`). It is derived assuming a linear/symmetric activation → designed for **sigmoid/tanh**.\
- **He initialization**: variance `2/n_in`. It accounts for **ReLU zeroing out roughly half the inputs** (halving the variance), so it uses a larger scale → the right choice for **ReLU and its variants**.\
\
**Rule:** tanh/sigmoid → Xavier; the ReLU family → He.
