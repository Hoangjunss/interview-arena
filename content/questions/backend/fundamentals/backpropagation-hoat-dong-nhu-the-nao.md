---
id: backpropagation-hoat-dong-nhu-the-nao
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Backpropagation hoạt động như thế nào?

## Question (EN)
How does backpropagation work?

## Đáp án chi tiết (VI)
Backpropagation là thuật toán **tính gradient của hàm mất mát theo mọi trọng số** một cách hiệu quả, để gradient descent cập nhật chúng.\
\
Hai lượt:\
\
1. **Forward pass**: đưa đầu vào qua mạng, tính đầu ra từng lớp và **loss** cuối cùng.\
2. **Backward pass**: áp dụng **quy tắc dây chuyền** từ đầu ra ngược về — tính gradient của loss ở lớp ra, rồi lan ngược qua từng lớp, tái sử dụng các **activation đã lưu**, để ra `∂L/∂w` cho mọi trọng số.\
\
**Điểm mấu chốt:** nó **tái sử dụng kết quả trung gian** (giống quy hoạch động trên đồ thị tính toán) nên chi phí chỉ khoảng **một lượt forward**, không bùng nổ. Sau đó một **optimizer** (SGD/Adam) dùng các gradient này để cập nhật trọng số.\
\
**Hình dung:** backprop chỉ *tính* gradient; nó **không phải** là bộ tối ưu — cập nhật trọng số là việc của optimizer.

## Detailed Answer (EN)
Backpropagation is the algorithm that **computes the gradient of the loss with respect to every weight** efficiently, so gradient descent can update them.\
\
Two passes:\
\
1. **Forward pass**: feed the input through the network, computing each layer's output and the final **loss**.\
2. **Backward pass**: apply the **chain rule** from the output backward — compute the loss gradient at the output layer, then propagate it back through each layer, reusing the **cached activations**, to obtain `∂L/∂w` for every weight.\
\
**Key insight:** it **reuses intermediate results** (like dynamic programming over the computational graph), so the cost is roughly **one forward pass**, not exponential. An **optimizer** (SGD/Adam) then uses these gradients to update the weights.\
\
**Picture it this way:** backprop only *computes* the gradients; it is **not** the optimizer — updating the weights is the optimizer's job.
