---
id: package-va-import-trong-go-hoat-dong-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Package và import trong Go hoạt động thế nào?

## Question (EN)
How do packages and imports work in Go?

## Đáp án chi tiết (VI)
Mỗi file Go thuộc 1 package (`package main`). `main` package + `func main()` = entry point. Import: `import \\"fmt\\"` hoặc grouped import. Exported names (public) viết hoa chữ cái đầu: `fmt.Println`. Lowercase = unexported (private trong package).

## Detailed Answer (EN)
Every Go file belongs to one package (`package main`). The `main` package with `func main()` is the program entry point. Imports: `import \\"fmt\\"` or grouped imports. Exported (public) identifiers start with a capital letter: `fmt.Println`. Lowercase identifiers are unexported (package-private).
