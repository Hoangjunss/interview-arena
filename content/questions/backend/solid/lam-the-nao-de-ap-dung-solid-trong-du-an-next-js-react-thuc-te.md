---
id: lam-the-nao-de-ap-dung-solid-trong-du-an-next-js-react-thuc-te
position: backend
technology: solid
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để áp dụng SOLID trong dự án Next.js/React thực tế?

## Question (EN)
How do you apply SOLID principles in a real Next.js/React project?

## Đáp án chi tiết (VI)
Trong React/Next.js, SRP áp dụng cho component (mỗi component một trách nhiệm), custom hook (tách logic ra khỏi UI), và service layer (tách API call ra file riêng). OCP áp dụng qua component composition và render props/children thay vì if/else trong component. DIP áp dụng qua dependency injection pattern trong custom hook: `useUserService(api: ApiClient)` nhận API client từ ngoài thay vì hard-code.\
\
Ví dụ thực tế: tách `UserProfile` thành `UserAvatar`, `UserInfo`, `UserActions` components (SRP); dùng `AuthContext` inject `authService` vào app (DIP); tạo `useFormValidation(validators: Validator[])` nhận validators từ ngoài (OCP + DIP). SOLID trong frontend thường ít formal hơn backend nhưng nguyên tắc vẫn có giá trị tương đương.

## Detailed Answer (EN)
In React/Next.js, SRP applies to components (each component owns one concern), custom hooks (extracting logic out of the UI), and the service layer (keeping API calls in dedicated files). OCP applies through component composition and render props/children instead of if/else inside components. DIP applies via dependency injection in custom hooks: `useUserService(api: ApiClient)` receives an API client from outside rather than hard-coding it. ISP applies when designing props interfaces — don't pass props a component doesn't need. Concrete examples: splitting `UserProfile` into `UserAvatar`, `UserInfo`, and `UserActions` (SRP); using `AuthContext` to inject `authService` into the app (DIP); creating `useFormValidation(validators: Validator[])` that receives validators from outside (OCP + DIP). SOLID in frontend is typically less formal than in backend, but the principles carry equal value.
