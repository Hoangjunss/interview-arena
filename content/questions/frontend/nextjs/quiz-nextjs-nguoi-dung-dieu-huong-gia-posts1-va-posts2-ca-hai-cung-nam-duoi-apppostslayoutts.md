---
id: quiz-nextjs-nguoi-dung-dieu-huong-gia-posts1-va-posts2-ca-hai-cung-nam-duoi-apppostslayoutts
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Người dùng điều hướng giữa /posts/1 và /posts/2, cả hai cùng nằm dưới app/posts/layout.tsx. Layout có bị render lại không?

## Đáp án trắc nghiệm
- [x] Không — layout giữ nguyên state và không render lại
- [ ] Có — mỗi lần đổi URL thì toàn bộ cây từ root layout xuống đều render lại
- [ ] Không, và cả children cũng không đổi vì cùng một layout
- [ ] Có, trừ khi bọc layout trong React.memo

## Giải thích (VI)
Không. Layout giữ nguyên qua các lần điều hướng trong phạm vi của nó — state, scroll position, input đang gõ đều còn. Chỉ children được thay bằng nội dung route mới. Đây là lý do sidebar hay audio player đặt trong layout không bị reset.

### Giải thích các phương án:
- **Không — layout giữ nguyên state và không render lại** (Đúng): Đây là tính chất preserve state của layout, khác hẳn với việc tải lại cả trang. Điều hướng giữa các route con của nó chỉ thay phần children.
- **Có — mỗi lần đổi URL thì toàn bộ cây từ root layout xuống đều render lại** (Sai): Nếu vậy thì layout đã mất hết ý nghĩa về mặt giữ state.
- **Không, và cả children cũng không đổi vì cùng một layout** (Sai): children chính là phần thay đổi theo route con.
- **Có, trừ khi bọc layout trong React.memo** (Sai): Hành vi này có sẵn, không cần memo hóa thủ công.
