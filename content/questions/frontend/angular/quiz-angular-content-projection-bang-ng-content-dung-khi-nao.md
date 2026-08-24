---
id: quiz-angular-content-projection-bang-ng-content-dung-khi-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Content projection bằng <ng-content> dùng khi nào?

## Đáp án trắc nghiệm
- [x] Khi component là khung chứa và nội dung do phía gọi quyết định
- [ ] Khi muốn component con tự gọi API mà không cần cha biết
- [ ] Khi cần truyền dữ liệu bất đồng bộ từ service xuống component con
- [ ] Chỉ dùng được một <ng-content> duy nhất cho mỗi component, không thể chia nhiều vùng

## Giải thích (VI)
<ng-content> dùng khi component là khung chứa (card, modal, panel) và nội dung bên trong do nơi gọi quyết định. Cha viết markup bên trong thẻ component, Angular chiếu markup đó vào vị trí <ng-content>. Nhiều vùng thì dùng select với CSS selector: <ng-content select="[card-title]">. Truyền markup dùng projection; truyền dữ liệu dùng input.

### Giải thích các phương án:
- **Khi component là khung chứa và nội dung do phía gọi quyết định** (Đúng): Đúng: projection truyền cả một mảnh markup, còn input truyền dữ liệu — hai nhu cầu khác nhau.
- **Khi muốn component con tự gọi API mà không cần cha biết** (Sai): Projection không liên quan tới việc gọi dữ liệu.
- **Khi cần truyền dữ liệu bất đồng bộ từ service xuống component con** (Sai): Đó là việc của input hoặc service dùng chung, không liên quan tới projection.
- **Chỉ dùng được một <ng-content> duy nhất cho mỗi component, không thể chia nhiều vùng** (Sai): Có thể chia nhiều vùng bằng thuộc tính select với CSS selector.
