---
id: lam-sao-de-mot-micro-frontend-loi-khong-lam-sap-ca-trang-fault-isolation
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để một micro-frontend lỗi không làm sập cả trang (fault isolation)?

## Question (EN)
How do you keep one failing micro-frontend from taking down the whole page (fault isolation)?

## Đáp án chi tiết (VI)
Tách biệt lỗi bằng cách bọc mỗi micro-frontend trong một error boundary và nạp/khởi tạo nó độc lập, để khi một mảnh crash thì chỉ hiện fallback của riêng nó, các mảnh khác vẫn chạy. Cụ thể: shell bọc mỗi mảnh trong React error boundary, hoặc try/catch khi mount (single-spa có `unmountErrorHandler` và timeouts); nếu `remoteEntry.js` load fail hoặc timeout thì hiện placeholder thay vì để lỗi cả trang. iframe cho tách biệt runtime mạnh nhất nhưng đánh đổi UX. Lưu ý: thiếu error boundary thì chỉ một remote lỗi/timeout có thể làm sập toàn bộ shell — luôn thiết kế fallback cho từng mảnh và đặt timeout cho việc load remote.

## Detailed Answer (EN)
Isolate failures by wrapping each micro-frontend in an error boundary and loading/initializing it independently, so when one piece crashes it shows only its own fallback while the others keep working. Concretely: the shell wraps each piece in a React error boundary, or try/catches at mount (single-spa has `unmountErrorHandler` and timeouts); if `remoteEntry.js` fails to load or times out, show a placeholder instead of letting the page break. Iframes give the strongest runtime isolation but at a UX cost. Note: without error boundaries, a single failing/timing-out remote can take down the entire shell — always design a per-piece fallback and set a timeout on remote loading.
