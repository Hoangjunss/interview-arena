---
id: quiz-frontend-core-spa-va-mpa-khac-nhau-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SPA và MPA khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] MPA luôn nhanh hơn SPA trong mọi trường hợp vì không cần JavaScript
- [ ] SPA không cần server vì chạy hoàn toàn ngoại tuyến sau lần tải đầu
- [x] SPA tự đổi nội dung bằng JavaScript khi điều hướng; MPA tải lại trang HTML mới từ server
- [ ] SPA không dùng URL thật nên không thể chia sẻ được đường dẫn trỏ tới một màn hình cụ thể nào

## Giải thích (VI)
SPA tải HTML và bundle một lần, sau đó router phía client đổi nội dung và cập nhật URL mà không tải lại trang — chuyển màn nhanh, giữ được state. MPA để server trả một tài liệu HTML riêng cho mỗi đường dẫn — hiển thị lần đầu nhanh, SEO đơn giản, nhưng mỗi lần điều hướng là một lần tải lại. Nhiều ứng dụng hiện nay dùng cách lai: server render trang đầu rồi điều hướng phía client.

### Giải thích các phương án:
- **MPA luôn nhanh hơn SPA trong mọi trường hợp vì không cần JavaScript** (Sai): MPA thường hiển thị lần đầu nhanh hơn, nhưng chuyển trang trong SPA lại nhanh hơn vì không tải lại toàn bộ.
- **SPA không cần server vì chạy hoàn toàn ngoại tuyến sau lần tải đầu** (Sai): SPA vẫn gọi API; chạy ngoại tuyến là chuyện của service worker, không phải bản chất SPA.
- **SPA tự đổi nội dung bằng JavaScript khi điều hướng; MPA tải lại trang HTML mới từ server** (Đúng): Đúng: khác ở chỗ ai dựng trang tiếp theo và có tải lại toàn bộ tài liệu không. SPA tải bundle một lần rồi router phía client đổi nội dung; MPA để server trả một tài liệu riêng cho mỗi đường dẫn.
- **SPA không dùng URL thật nên không thể chia sẻ được đường dẫn trỏ tới một màn hình cụ thể nào** (Sai): SPA vẫn có router và cập nhật URL qua History API.
