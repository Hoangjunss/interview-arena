---
id: chon-base-image-alpine-slim-hay-distroless-dua-tren-gi-alpine-hay-gay-loi-gi-voi
position: backend
technology: base-image
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn base image `alpine`, `slim` hay `distroless` dựa trên gì? Alpine hay gây lỗi gì với Node/Python?

## Question (EN)
How do you choose between `alpine`, `slim`, and `distroless` base images? What problems does Alpine cause with Node/Python?

## Đáp án chi tiết (VI)
Alpine nhỏ (~5 MB) nhưng dùng **musl libc** thay vì **glibc**, và đó là nguồn gốc phần lớn sự cố:\
\
- **Native module không có prebuilt binary cho musl** — Node phải biên dịch lại từ source (cần thêm `python3`, `make`, `g++`), build lâu và dễ lỗi.\
- **Python**: wheel nhị phân trên PyPI build theo chuẩn manylinux/glibc, không dùng được trên musl → pip biên dịch lại từ source, image build chậm hơn nhiều và cuối cùng có khi còn lớn hơn bản `slim`.\
- Một số khác biệt runtime khác: DNS resolver, `getaddrinfo`, stack size mặc định của thread nhỏ hơn.\
\
**Lựa chọn thực tế:**\
\
| Base | Khi dùng |\
|---|---|\
| `-slim` (Debian) | Mặc định an toàn cho Node/Python — glibc, wheel/prebuilt chạy được |\
| `alpine` | Go, Rust hoặc binary tĩnh; app đơn giản không có native dep |\
| `distroless` | Chỉ có runtime, không shell/package manager — bề mặt tấn công nhỏ nhất, nhưng khó debug |\
\
Ưu tiên chọn theo **rủi ro vận hành**, không chỉ theo số MB.

## Detailed Answer (EN)
Alpine is tiny (~5 MB) but uses **musl libc** instead of **glibc**, which is the source of most of its problems:\
\
- **Native modules have no prebuilt binaries for musl** — Node has to compile them from source (requiring `python3`, `make`, `g++`), making builds slow and fragile.\
- **Python**: binary wheels on PyPI target manylinux/glibc and cannot be used on musl → pip compiles from source, builds get far slower, and the result can end up larger than the `slim` variant.\
- Other runtime differences: DNS resolver behaviour, `getaddrinfo`, and a smaller default thread stack size.\
\
**Practical choice:**\
\
| Base | When to use |\
|---|---|\
| `-slim` (Debian) | Safe default for Node/Python — glibc, prebuilt wheels work |\
| `alpine` | Go, Rust, or static binaries; simple apps with no native deps |\
| `distroless` | Runtime only, no shell or package manager — smallest attack surface, hardest to debug |\
\
Pick based on **operational risk**, not just megabytes.
