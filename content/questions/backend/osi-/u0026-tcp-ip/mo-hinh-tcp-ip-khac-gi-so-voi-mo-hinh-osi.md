---
id: mo-hinh-tcp-ip-khac-gi-so-voi-mo-hinh-osi
position: backend
technology: osi-\u0026-tcp-ip
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình TCP/IP khác gì so với mô hình OSI?

## Question (EN)
How does the TCP/IP model differ from the OSI model?

## Đáp án chi tiết (VI)
TCP/IP (hay DoD model) gộp OSI 7 tầng xuống còn 4 tầng: Network Access (= Physical + Data Link), Internet (= Network), Transport (giữ nguyên), Application (= Session + Presentation + Application).\
\
TCP/IP là mô hình thực tiễn được dùng trong toàn bộ Internet hiện đại, trong khi OSI là mô hình tham chiếu lý thuyết để chuẩn hóa giao tiếp giữa các vendor. Khi lập trình với socket (Node.js `net`, Go `net.Dial`), bạn đang làm việc ở tầng Transport của TCP/IP. Hiểu sự khác biệt này giúp khi đọc tài liệu — RFC mô tả TCP/IP, còn sách giáo khoa network dùng OSI.

## Detailed Answer (EN)
The TCP/IP model (also called the DoD model) collapses the OSI 7 layers into 4: Network Access (= Physical + Data Link), Internet (= Network), Transport (unchanged), and Application (= Session + Presentation + Application).\
\
TCP/IP is the practical model used across the modern Internet, while OSI is a theoretical reference model designed to standardize inter-vendor communication. When programming with sockets (Node.js `net`, Go `net.Dial`), you are working at the TCP/IP Transport layer. Understanding this distinction helps when reading documentation — RFCs describe TCP/IP, while networking textbooks typically use OSI.
