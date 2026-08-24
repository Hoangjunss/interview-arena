---
id: dependency-array-trong-useeffect-co-y-nghia-gi
position: backend
technology: usestate-\u0026-useeffect
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency array trong useEffect có ý nghĩa gì?

## Question (EN)
What is the purpose of the dependency array in useEffect?

## Đáp án chi tiết (VI)
Dependency array kiểm soát khi nào effect chạy lại. Không có array: chạy sau mỗi render. Array rỗng `[]`: chỉ chạy sau mount, tương đương componentDidMount. Array có giá trị `[a, b]`: chạy khi a hoặc b thay đổi. React ESLint plugin exhaustive-deps giúp phát hiện missing dependencies.

## Detailed Answer (EN)
The dependency array controls when the effect re-runs. No array: runs after every render. Empty array `[]`: runs only after the initial mount, equivalent to componentDidMount. Array with values `[a, b]`: runs whenever a or b changes. The React ESLint plugin's exhaustive-deps rule helps catch missing dependencies.
