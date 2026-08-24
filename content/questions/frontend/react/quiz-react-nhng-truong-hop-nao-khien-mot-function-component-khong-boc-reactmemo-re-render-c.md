---
id: quiz-react-nhng-truong-hop-nao-khien-mot-function-component-khong-boc-reactmemo-re-render-c
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những trường hợp nào khiến một function component (không bọc React.memo) re-render? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] State của chính nó thay đổi (setter được gọi với giá trị khác giá trị hiện tại)
- [ ] Giá trị ref.current của nó thay đổi
- [ ] Một biến module-level (khai báo ngoài component) mà nó đọc thay đổi giá trị

## Giải thích (VI)
Ba nguồn re-render: (1) state của chính component thay đổi; (2) component cha re-render — mặc định kéo theo toàn bộ con, bất kể props; (3) context nó đang đọc thay đổi giá trị. Thay đổi ref.current hay biến ngoài component không gây re-render vì React không theo dõi chúng. React.memo chỉ chặn được nguồn (2).

### Giải thích các phương án:
- **State của chính nó thay đổi (setter được gọi với giá trị khác giá trị hiện tại)** (Đúng): Đúng — setState là nguồn re-render gốc; lưu ý React bỏ qua nếu giá trị mới bằng giá trị cũ theo Object.is.
- **Giá trị ref.current của nó thay đổi** (Sai): Sai — React không theo dõi ref; thay đổi ref.current không bao giờ tự gây re-render.
- **Một biến module-level (khai báo ngoài component) mà nó đọc thay đổi giá trị** (Sai): Sai — React không quan sát biến thường bên ngoài; muốn component phản ứng với nguồn dữ liệu ngoài phải đưa vào state, context hoặc useSyncExternalStore.
