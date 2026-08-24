---
id: trong-mot-app-react-thuc-te-ban-phan-loai-state-thanh-may-nhom-moi-nhom-dung-con
position: backend
technology: phân-loại-state
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong một app React thực tế, bạn phân loại state thành mấy nhóm? Mỗi nhóm dùng công cụ gì?

## Question (EN)
How do you classify state in a real React app, and which tool fits each kind?

## Đáp án chi tiết (VI)
Chia theo **nguồn sở hữu dữ liệu**, không chia theo \\"global hay local\\". Bốn nhóm hay gặp:\
\
- **Server state** — dữ liệu thuộc về backend, client chỉ giữ bản sao có thể cũ: danh sách đơn hàng, hồ sơ user. Đặc trưng: bất đồng bộ, có thể stale, cần cache/refetch/invalidate. Công cụ: **React Query / RTK Query / SWR**.\
- **Client state (UI state)** — chỉ tồn tại ở trình duyệt: modal đang mở, tab đang chọn, theme, giỏ hàng tạm. Công cụ: `useState` → lift state → **Zustand / Jotai / Redux** khi nhiều nhánh cây cùng đọc.\
- **URL state** — bộ lọc, từ khoá tìm kiếm, số trang, id đang xem. Để trên `searchParams` thì link chia sẻ được, F5 không mất, nút back hoạt động đúng.\
- **Form state** — giá trị đang gõ, `touched`, `dirty`, lỗi validate. Để cục bộ trong form (`react-hook-form` hoặc uncontrolled), chỉ đẩy ra ngoài khi submit.\
\
Lỗi phổ biến khi trả lời: gộp tất cả vào một store global. Nhét server state vào Redux là tự viết lại cache, loading, retry, invalidate — phần khó nhất của bài toán.

## Detailed Answer (EN)
$7a
