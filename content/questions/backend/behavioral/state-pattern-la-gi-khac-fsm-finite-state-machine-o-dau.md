---
id: state-pattern-la-gi-khac-fsm-finite-state-machine-o-dau
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State pattern là gì? Khác FSM (Finite State Machine) ở đâu?

## Question (EN)
What is the State pattern? How does it differ from a Finite State Machine (FSM)?

## Đáp án chi tiết (VI)
State pattern cho phép object thay đổi behavior khi state nội tại thay đổi — object dường như thay đổi class. Thay vì `if (state === 'idle') ... else if (state === 'loading') ...` khắp codebase, mỗi state là một class với behavior riêng. \
\
**Ví dụ:** `TrafficLight` có states `RedState`, `GreenState`, `YellowState` — mỗi state implement `interface TrafficLightState { next(light: TrafficLight): void; getColor(): string }`. State pattern và FSM (Finite State Machine) rất gần nhau: FSM là concept toán học (states, transitions, inputs), State pattern là implementation OOP của FSM. Thư viện XState cho JavaScript implement FSM/Statechart theo cách declarative, phù hợp hơn State pattern thuần cho complex flows. Dùng khi: object có behavior phụ thuộc rõ ràng vào state; khi state transitions phức tạp và cần maintainable. Không dùng khi: chỉ 2-3 states đơn giản — enum + switch/case readable hơn.

## Detailed Answer (EN)
The State pattern allows an object to change its behavior when its internal state changes — the object appears to change its class. Instead of scattering `if (state === 'idle') ... else if (state === 'loading') ...` throughout the codebase, each state is a class with its own behavior. \
\
**Example:** `TrafficLight` has `RedState`, `GreenState`, and `YellowState` — each implementing `interface TrafficLightState { next(light: TrafficLight): void; getColor(): string }`. The State pattern and FSM (Finite State Machine) are closely related: FSM is a mathematical concept (states, transitions, inputs); the State pattern is an OOP implementation of FSM. The XState library for JavaScript implements FSM/Statecharts declaratively and is better suited than the pure State pattern for complex flows. Use it when an object's behavior clearly depends on its state and when state transitions are complex enough to warrant maintainability. Skip it when there are only 2–3 simple states — an enum + switch/case is more readable.
