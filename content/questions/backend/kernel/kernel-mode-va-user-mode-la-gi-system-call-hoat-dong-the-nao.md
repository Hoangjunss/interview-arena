---
id: kernel-mode-va-user-mode-la-gi-system-call-hoat-dong-the-nao
position: backend
technology: kernel
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kernel mode và user mode là gì? System call hoạt động thế nào?

## Question (EN)
What are kernel mode and user mode? How does a system call work?

## Đáp án chi tiết (VI)
CPU hiện đại có ít nhất 2 mức đặc quyền, phân biệt bằng một bit chế độ (mode bit):\
- **User mode**: code ứng dụng chạy ở đây, KHÔNG được thực thi lệnh đặc quyền (truy cập trực tiếp phần cứng, sửa page table, tắt ngắt...).\
- **Kernel mode** (supervisor): code nhân chạy với toàn quyền trên phần cứng.\
\
Cách ly này bảo vệ hệ thống: một app lỗi/độc hại không thể trực tiếp phá phần cứng hay tiến trình khác.\
\
**System call** là cầu để user code yêu cầu dịch vụ đặc quyền (đọc file, cấp bộ nhớ, tạo tiến trình...). Cơ chế:\
1. Ứng dụng đặt số hiệu syscall và tham số vào thanh ghi.\
2. Thực thi lệnh trap (`syscall`) → CPU chuyển sang kernel mode và nhảy tới handler cố định (qua trap table).\
3. Nhân kiểm tra tham số, thực hiện thao tác đặc quyền.\
4. Trả kết quả, `return-from-trap` chuyển lại về user mode và tiếp tục ứng dụng.\
\
Việc ép qua điểm vào cố định (không cho app tự nhảy vào code kernel tùy ý) chính là điều giữ an toàn cho lần chuyển quyền này.

## Detailed Answer (EN)
$87
