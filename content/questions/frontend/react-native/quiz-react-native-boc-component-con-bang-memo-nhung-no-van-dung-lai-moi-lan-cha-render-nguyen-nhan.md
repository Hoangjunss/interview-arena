---
id: quiz-react-native-boc-component-con-bang-memo-nhung-no-van-dung-lai-moi-lan-cha-render-nguyen-nhan
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bọc component con bằng memo nhưng nó vẫn dựng lại mỗi lần cha render. Nguyên nhân?

## Đáp án trắc nghiệm
- [ ] memo chỉ hoạt động với class component
- [x] Props là hàm hoặc đối tượng tạo mới mỗi lần
- [ ] Cần đặt displayName thì memo mới có hiệu lực
- [ ] Component con có state riêng nên bỏ qua memo

## Giải thích (VI)
memo so sánh props theo tham chiếu . Một hàm gọi lại hoặc một đối tượng kiểu tạo ngay trong JSX sinh tham chiếu mới ở mỗi lần render, nên phép so sánh luôn thất bại. Cần useCallback và useMemo cho các props đó.

### Giải thích các phương án:
- **memo chỉ hoạt động với class component** (Sai): Nó dành cho function component.
- **Props là hàm hoặc đối tượng tạo mới mỗi lần** (Đúng): So sánh nông dựa trên tham chiếu, mà tham chiếu mới thì luôn khác tham chiếu cũ.
- **Cần đặt displayName thì memo mới có hiệu lực** (Sai): Tên hiển thị chỉ phục vụ công cụ gỡ lỗi.
- **Component con có state riêng nên bỏ qua memo** (Sai): State riêng không ảnh hưởng tới việc so sánh props.
