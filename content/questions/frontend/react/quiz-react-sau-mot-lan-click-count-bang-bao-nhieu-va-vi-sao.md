---
id: quiz-react-sau-mot-lan-click-count-bang-bao-nhieu-va-vi-sao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau một lần click, count bằng bao nhiêu và vì sao?

## Đáp án trắc nghiệm
- [ ] 3 — mỗi lần gọi setter, count được cập nhật ngay lập tức nên lần sau đọc được giá trị mới
- [x] 1 — cả ba lần gọi đều dùng cùng giá trị count = 0 từ closure của render hiện tại; React batch các update nên kết quả là set 1 ba lần
- [ ] 0 — vì setState là bất đồng bộ nên cả ba lần gọi trong cùng event đều bị bỏ qua
- [ ] 3 — nhưng chỉ từ React 18, vì automatic batching gộp ba update thành một phép cộng dồn

## Giải thích (VI)
Kết quả là 1. Event handler capture closure — count bị đóng băng ở giá trị 0 của render hiện tại, nên cả ba lệnh đều tính 0 + 1; React batch chúng thành một lần re-render với giá trị 1. Muốn cộng dồn, dùng functional updater: setCount(prev => prev + 1) ba lần sẽ ra 3.

### Giải thích các phương án:
- **3 — mỗi lần gọi setter, count được cập nhật ngay lập tức nên lần sau đọc được giá trị mới** (Sai): setCount không đổi giá trị biến count trong render hiện tại — count là hằng số của closure, chỉ render tiếp theo mới thấy giá trị mới.
- **1 — cả ba lần gọi đều dùng cùng giá trị count = 0 từ closure của render hiện tại; React batch các update nên kết quả là set 1 ba lần** (Đúng): Đúng: count bị "đóng băng" trong closure của lần render này, ba lệnh đều tính 0 + 1; muốn cộng dồn phải dùng functional updater.
- **0 — vì setState là bất đồng bộ nên cả ba lần gọi trong cùng event đều bị bỏ qua** (Sai): Update không bị bỏ qua — chúng được batch lại và áp dụng ở cuối event, kết quả là 1 chứ không phải 0.
- **3 — nhưng chỉ từ React 18, vì automatic batching gộp ba update thành một phép cộng dồn** (Sai): Batching gộp các update thành MỘT lần re-render, không cộng dồn giá trị; ba lệnh vẫn cùng set 0 + 1 = 1 ở mọi phiên bản React.
