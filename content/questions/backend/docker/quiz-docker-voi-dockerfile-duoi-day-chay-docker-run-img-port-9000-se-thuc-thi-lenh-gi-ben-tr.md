---
id: quiz-docker-voi-dockerfile-duoi-day-chay-docker-run-img-port-9000-se-thuc-thi-lenh-gi-ben-tr
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với Dockerfile dưới đây, chạy docker run img --port 9000 sẽ thực thi lệnh gì bên trong container?

## Đáp án trắc nghiệm
- [ ] python -m app --port 8000 --port 9000 — arguments dòng lệnh được nối thêm vào CMD chứ không thay thế
- [x] python -m app --port 9000 — ENTRYPOINT cố định executable, arguments sau tên image ghi đè CMD
- [ ] port 9000 — arguments của docker run ghi đè cả ENTRYPOINT lẫn CMD
- [ ] CMD và ENTRYPOINT giống nhau nên chỉ dòng cuối cùng có hiệu lực, container chạy python -m app --port 8000

## Giải thích (VI)
Chạy python -m app --port 9000. ENTRYPOINT cố định executable chính (python -m app); CMD chỉ cung cấp default arguments (--port 8000). Arguments truyền sau tên image khi docker run sẽ thay thế toàn bộ CMD, rồi được nối vào sau ENTRYPOINT. Muốn thay chính ENTRYPOINT phải dùng cờ --entrypoint.

### Giải thích các phương án:
- **python -m app --port 8000 --port 9000 — arguments dòng lệnh được nối thêm vào CMD chứ không thay thế** (Sai): Arguments của docker run thay thế toàn bộ CMD, không nối thêm — nên chỉ còn --port 9000.
- **python -m app --port 9000 — ENTRYPOINT cố định executable, arguments sau tên image ghi đè CMD** (Đúng): Đúng: dùng exec-form, ENTRYPOINT cố định executable chính còn arguments của docker run thay thế CMD và được nối vào sau ENTRYPOINT.
- **port 9000 — arguments của docker run ghi đè cả ENTRYPOINT lẫn CMD** (Sai): ENTRYPOINT không bị ghi đè bởi arguments thường; muốn thay ENTRYPOINT phải dùng cờ --entrypoint.
- **CMD và ENTRYPOINT giống nhau nên chỉ dòng cuối cùng có hiệu lực, container chạy python -m app --port 8000** (Sai): Hiểu nhầm phổ biến: hai lệnh này khác vai trò và bổ trợ nhau — ENTRYPOINT là executable, CMD là default args có thể ghi đè.
