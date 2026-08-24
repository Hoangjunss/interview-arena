---
id: mvc-mvp-mvvm-la-gi-su-khac-biet-va-ung-dung-trong-frontend-hien-dai
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MVC, MVP, MVVM là gì? Sự khác biệt và ứng dụng trong frontend hiện đại?

## Question (EN)
What are MVC, MVP, and MVVM? Key differences and applications in modern frontend?

## Đáp án chi tiết (VI)
Ba architectural patterns tách UI logic:\
\
- **MVC** (Model-View-Controller): Controller xử lý input, update Model, View render Model — Controller và View biết nhau; truyền thống trong server-side (Rails, Laravel, Express).\
- **MVP** (Model-View-Presenter): Presenter xử lý logic thay Controller, View passive hơn chỉ nhận data từ Presenter và forward events — testable hơn vì Presenter pure class, không phụ thuộc UI.\
- **MVVM** (Model-View-ViewModel): ViewModel expose Observable state, View bind tự động qua data binding — Vue.js, Angular, WPF, React với hooks.\
\
Trong React hiện đại: Component = View, Custom Hook = ViewModel (logic + state), Service/Store = Model. Data flow: MVC hai chiều; MVVM data binding tự động; MVP qua interface contract.

## Detailed Answer (EN)
Three architectural patterns for separating UI logic: **MVC** (Model-View-Controller): the Controller handles input and updates the Model, the View renders the Model — Controller and View know about each other; traditional in server-side frameworks (Rails, Laravel, Express). **MVP** (Model-View-Presenter): the Presenter replaces the Controller; the View is more passive, only receiving data from the Presenter and forwarding events — more testable because the Presenter is a plain class with no UI dependency. **MVVM** (Model-View-ViewModel): the ViewModel exposes observable state; the View binds automatically via data binding — Vue.js, Angular, WPF, React with hooks. In modern React: Component = View, Custom Hook = ViewModel (logic + state), Service/Store = Model. Key differences: data flow direction — MVC is bidirectional; MVVM uses automatic data binding; MVP relies on interface contracts. Choose: server-side → MVC; Angular/Vue → MVVM naturally; React → MVVM with hooks; legacy Android → MVP.
