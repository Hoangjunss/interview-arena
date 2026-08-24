---
id: ban-thiet-ke-mot-pipeline-ci-cd-nhieu-stage-the-nao-job-nao-chay-song-song-job-n
position: backend
technology: pipeline-design
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn thiết kế một pipeline CI/CD nhiều stage thế nào? Job nào chạy song song, job nào phải tuần tự?

## Question (EN)
How do you design a multi-stage CI/CD pipeline? Which jobs run in parallel and which must be sequential?

## Đáp án chi tiết (VI)
**Nguyên tắc: việc rẻ và hay hỏng đặt trước, việc đắt đặt sau.** Một bố cục thường dùng:\
\
- **Stage 1 (song song):** lint, typecheck, unit test — chỉ cần source code, không phụ thuộc nhau.\
- **Stage 2:** build → sinh ra **một** artifact duy nhất (image hoặc bundle).\
- **Stage 3 (song song):** integration test, e2e, security scan — cùng lấy artifact của stage 2.\
- **Stage 4 (tuần tự):** deploy staging → smoke test → deploy production.\
\
```yaml\
jobs:\
  lint:\
    runs-on: ubuntu-latest\
  test:\
    runs-on: ubuntu-latest\
  build:\
    needs: [lint, test]\
  deploy:\
    needs: [build]\
```\
\
Chỉ đặt ràng buộc tuần tự khi có **phụ thuộc dữ liệu** (job sau cần output job trước) hoặc **phụ thuộc tài nguyên** (hai job deploy cùng một môi trường). Ràng buộc thừa chỉ kéo dài thời gian chờ thực tế.\
\
Thêm `concurrency` theo branch để hủy run cũ khi có commit mới — không tốn runner cho commit đã lỗi thời.

## Detailed Answer (EN)
**Principle: cheap and failure-prone checks first, expensive work later.** A common layout:\
\
- **Stage 1 (parallel):** lint, typecheck, unit tests — they only need source and do not depend on each other.\
- **Stage 2:** build → produces **one** artifact (image or bundle).\
- **Stage 3 (parallel):** integration tests, e2e, security scan — all consume the stage 2 artifact.\
- **Stage 4 (sequential):** deploy staging → smoke test → deploy production.\
\
```yaml\
jobs:\
  lint:\
    runs-on: ubuntu-latest\
  test:\
    runs-on: ubuntu-latest\
  build:\
    needs: [lint, test]\
  deploy:\
    needs: [build]\
```\
\
Only add a sequential constraint when there is a real **data dependency** (a later job consumes an earlier job's output) or **resource dependency** (two jobs deploying to the same environment). Extra constraints just inflate wall-clock time.\
\
Add branch-scoped `concurrency` so a new commit cancels the in-flight run — no runner time spent on an outdated commit.
