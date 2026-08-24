---
id: quiz-react-dependency-array-cua-useeffect-kiem-soat-viec-chay-effect-nhu-the-nao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency array của useEffect kiểm soát việc chạy effect như thế nào?

## Đáp án trắc nghiệm
- [ ] Dependency array chỉ là gợi ý tối ưu; React vẫn tự phân tích code trong effect để quyết định khi nào chạy lại
- [ ] Không truyền array thì effect chỉ chạy một lần lúc mount, giống componentDidMount
- [x] Không truyền array: chạy sau mỗi render; array rỗng []: chỉ chạy sau lần mount đầu; [a, b]: chạy lại khi a hoặc b thay đổi (so sánh Object.is)
- [ ] Array rỗng [] nghĩa là effect không bao giờ chạy, vì không có dependency nào kích hoạt nó

## Giải thích (VI)
Ba trường hợp: không truyền array — effect chạy sau mỗi render; array rỗng [] — chỉ chạy sau mount (cleanup khi unmount); array có giá trị [a, b] — chạy lại khi a hoặc b thay đổi, so sánh bằng Object.is. React không tự phân tích code trong effect, nên ESLint rule exhaustive-deps giúp phát hiện dependency bị khai thiếu.

### Giải thích các phương án:
- **Dependency array chỉ là gợi ý tối ưu; React vẫn tự phân tích code trong effect để quyết định khi nào chạy lại** (Sai): React không phân tích code trong effect — nó chỉ so sánh đúng những giá trị bạn khai báo trong array, nên khai thiếu sẽ gây stale value.
- **Không truyền array thì effect chỉ chạy một lần lúc mount, giống componentDidMount** (Sai): Ngược lại: bỏ hẳn array khiến effect chạy sau MỌI render; muốn chạy một lần thì phải truyền array rỗng.
- **Không truyền array: chạy sau mỗi render; array rỗng []: chỉ chạy sau lần mount đầu; [a, b]: chạy lại khi a hoặc b thay đổi (so sánh Object.is)** (Đúng): Đúng cả ba trường hợp — React so sánh từng dependency với lần render trước bằng Object.is để quyết định chạy lại effect.
- **Array rỗng [] nghĩa là effect không bao giờ chạy, vì không có dependency nào kích hoạt nó** (Sai): Array rỗng vẫn chạy effect MỘT lần sau mount (và cleanup khi unmount) — nó chỉ ngăn effect chạy lại ở các render sau.
