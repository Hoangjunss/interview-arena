---
id: quiz-ci-cd-job-nao-nen-chan-merge-job-nao-nen-chay-sau-khi-merge
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Job nào nên chặn merge, job nào nên chạy sau khi merge?

## Đáp án trắc nghiệm
- [x] Nhanh và tất định thì chặn merge; chậm hoặc flaky chạy sau
- [ ] Mọi job đều nên chặn merge để bảo đảm chất lượng
- [ ] Tuỳ người review quyết định trong từng pull request
- [ ] Chỉ cần lint chặn merge, còn test chạy sau là đủ

## Giải thích (VI)
Chặn merge: lint, kiểm kiểu, unit + integration test — nhanh và tất định. Chạy sau merge hoặc theo lịch: e2e đầy đủ, test hiệu năng, quét bảo mật sâu, build cho nhiều nền tảng.

### Giải thích các phương án:
- **Nhanh và tất định thì chặn merge; chậm hoặc flaky chạy sau** (Đúng): Chặn merge bằng job chạy 25 phút sẽ khiến người ta tìm cách lách qua.
- **Mọi job đều nên chặn merge để bảo đảm chất lượng** (Sai): Vòng phản hồi quá dài, và một job flaky sẽ chặn cả nhóm.
- **Tuỳ người review quyết định trong từng pull request** (Sai): Không nhất quán và không kiểm soát được chất lượng nhánh chính.
- **Chỉ cần lint chặn merge, còn test chạy sau là đủ** (Sai): Lỗi logic sẽ vào nhánh chính và ảnh hưởng người khác.
