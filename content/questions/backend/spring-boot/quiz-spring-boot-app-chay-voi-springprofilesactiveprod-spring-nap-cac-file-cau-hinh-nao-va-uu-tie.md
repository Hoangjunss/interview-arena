---
id: quiz-spring-boot-app-chay-voi-springprofilesactiveprod-spring-nap-cac-file-cau-hinh-nao-va-uu-tie
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
App chạy với spring.profiles.active=prod. Spring nạp các file cấu hình nào và ưu tiên ra sao?

## Đáp án trắc nghiệm
- [ ] application.yml ghi đè application-prod.yml vì file base luôn có ưu tiên cao nhất
- [ ] Chỉ nạp application-prod.yml; application.yml bị bỏ hoàn toàn khi có profile active
- [x] Nạp application.yml rồi application-prod.yml ghi đè lên cho cùng key
- [ ] Phải build một artifact riêng cho prod vì Spring không thể chọn cấu hình theo môi trường lúc runtime

## Giải thích (VI)
Spring nạp application.yml (base) rồi merge application-prod.yml lên trên; với cùng key, giá trị ở file profile active ghi đè base. Kích hoạt qua spring.profiles.active=prod (hoặc biến môi trường SPRING PROFILES ACTIVE). Nhờ vậy chỉ cần deploy MỘT JAR cho mọi môi trường và chọn cấu hình lúc chạy. Bean cũng có thể gắn @Profile("prod") để chỉ tồn tại ở env tương ứng.

### Giải thích các phương án:
- **application.yml ghi đè application-prod.yml vì file base luôn có ưu tiên cao nhất** (Sai): Sai: ngược lại — file của profile active override file base cho cùng key.
- **Chỉ nạp application-prod.yml; application.yml bị bỏ hoàn toàn khi có profile active** (Sai): Sai: application.yml (base) vẫn được nạp làm nền; file profile chỉ override những key nó khai.
- **Nạp application.yml rồi application-prod.yml ghi đè lên cho cùng key** (Đúng): Đúng: file base luôn nạp, file theo profile active merge/override lên trên — nhờ đó deploy MỘT JAR cho mọi môi trường.
- **Phải build một artifact riêng cho prod vì Spring không thể chọn cấu hình theo môi trường lúc runtime** (Sai): Sai: chính mục đích của profiles là một artifact chạy mọi env, chọn cấu hình lúc chạy qua profile active.
