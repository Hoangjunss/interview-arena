---
id: quiz-frontend-core-event-bubbling-capturing-va-event-delegation-la-gi
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event bubbling, capturing và event delegation là gì?

## Đáp án trắc nghiệm
- [ ] Mọi sự kiện đều bubbling, kể cả focus và scroll trên phần tử
- [x] Capturing đi từ gốc xuống đích, bubbling nổi ngược lên; delegation gắn listener ở cha
- [ ] Bubbling đi từ gốc xuống đích, capturing đi từ đích lên gốc
- [ ] Delegation nghĩa là gắn listener riêng cho từng phần tử con nhưng dùng chung một hàm xử lý

## Giải thích (VI)
Một sự kiện đi qua ba pha: capturing từ window xuống phần tử đích, tới đích, rồi bubbling nổi ngược lên. addEventListener mặc định nghe ở pha bubbling; truyền { capture: true } để nghe ở pha xuống. Event delegation gắn một listener ở phần tử cha và dùng event.target.closest(...) để biết con nào bị tác động — ít listener hơn và hoạt động cả với phần tử thêm vào sau.

### Giải thích các phương án:
- **Mọi sự kiện đều bubbling, kể cả focus và scroll trên phần tử** (Sai): focus, blur và một số sự kiện khác không bubbling (có bản thay thế focusin/focusout).
- **Capturing đi từ gốc xuống đích, bubbling nổi ngược lên; delegation gắn listener ở cha** (Đúng): Đúng: ba khái niệm nối nhau — delegation là ứng dụng của bubbling, chỉ cần một listener ở phần tử cha là xử lý được cho mọi phần tử con, kể cả con được thêm sau.
- **Bubbling đi từ gốc xuống đích, capturing đi từ đích lên gốc** (Sai): Đảo ngược: capturing đi xuống, bubbling đi lên.
- **Delegation nghĩa là gắn listener riêng cho từng phần tử con nhưng dùng chung một hàm xử lý** (Sai): Delegation dùng đúng một listener ở cha, không gắn cho từng con.
