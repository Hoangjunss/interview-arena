---
id: giai-thich-convolution-kernel-stride-padding-va-pooling-trong-cnn
position: backend
technology: architectures
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích convolution, kernel, stride, padding và pooling trong CNN.

## Question (EN)
Explain convolution, kernel, stride, padding, and pooling in a CNN.

## Đáp án chi tiết (VI)
CNN xử lý dữ liệu dạng lưới (ảnh) nhờ **kết nối cục bộ** và **chia sẻ trọng số**.\
\
- **Kernel / filter**: ma trận trọng số nhỏ, trượt trên đầu vào; ở mỗi vị trí tính tích vô hướng → phát hiện một mẫu cục bộ (cạnh, kết cấu). Trọng số được học.\
- **Convolution**: trượt kernel khắp đầu vào tạo ra một **feature map**. Hai ý cốt lõi: trường tiếp nhận cục bộ + chia sẻ trọng số → **ít tham số hơn hẳn** lớp dày đặc, và bất biến-tương-đương với dịch chuyển.\
- **Stride**: bước trượt; stride 2 làm **giảm mẫu** (output nhỏ hơn).\
- **Padding**: thêm viền (thường bằng 0) để output giữ kích thước (`same`) hoặc thu nhỏ (`valid`).\
- **Pooling** (max/average): giảm mẫu feature map bằng cách tóm tắt một cửa sổ → giảm kích thước/chi phí, thêm chút bất biến với dịch chuyển nhỏ.\
\
Xếp chồng nhiều lớp conv → học **đặc trưng phân cấp**: cạnh → bộ phận → đối tượng.

## Detailed Answer (EN)
A CNN processes grid-like data (images) via **local connectivity** and **weight sharing**.\
\
- **Kernel / filter**: a small weight matrix slid over the input; at each position it computes a dot product → detecting a local pattern (edge, texture). The weights are learned.\
- **Convolution**: sliding the kernel across the whole input produces a **feature map**. Two core ideas: a local receptive field + weight sharing → **far fewer parameters** than a dense layer, and translation equivariance.\
- **Stride**: the step of the slide; stride 2 **downsamples** (smaller output).\
- **Padding**: adding a border (usually zeros) so the output keeps its size (`same`) or shrinks (`valid`).\
- **Pooling** (max/average): downsamples a feature map by summarizing a window → reduces size/compute and adds small translation invariance.\
\
Stacking many conv layers learns **hierarchical features**: edges → parts → objects.
