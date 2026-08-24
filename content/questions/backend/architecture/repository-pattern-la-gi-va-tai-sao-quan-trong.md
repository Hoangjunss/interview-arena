---
id: repository-pattern-la-gi-va-tai-sao-quan-trong
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Repository pattern là gì và tại sao quan trọng?

## Question (EN)
What is the Repository pattern and why is it important?

## Đáp án chi tiết (VI)
Repository pattern trừu tượng hóa các nguồn dữ liệu (local database, remote API, cache) sau một interface duy nhất, để ViewModel không cần biết dữ liệu đến từ đâu. Sự decoupling này giúp test dễ hơn (mock repository) và cho phép đổi nguồn dữ liệu mà không cần sửa ViewModel. Repository điều phối giữa dữ liệu local và remote, implement caching strategy, và là single source of truth.

## Detailed Answer (EN)
The Repository pattern abstracts data sources (local database, remote API, cache) behind a single interface, so the ViewModel doesn't know where data comes from. This decoupling makes testing easier (mock the repository) and allows switching data sources without changing ViewModels. A repository coordinates between local and remote data and provides a single source of truth.
