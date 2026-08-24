---
id: thiet-ke-form-builder-drag-drop
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế form builder (drag \u0026 drop)?

## Question (EN)
How would you design a drag-and-drop form builder?

## Đáp án chi tiết (VI)
Form builder cần hai chế độ chính: Edit mode cho phép kéo thả các field types vào canvas, và Preview mode hiển thị form như user cuối sẽ thấy. Phần drag and drop nên dùng @dnd-kit vì nó nhẹ, accessible, và hỗ trợ tốt React (react-beautiful-dnd không còn được maintain từ 2023).\
\
Kiến trúc cốt lõi là schema-driven: mỗi form được biểu diễn dưới dạng JSON schema, và có một component registry để map từ field type sang React component tương ứng, giúp dễ mở rộng thêm loại field mới.\
\
Các tính năng nâng cao gồm validation rules engine cho phép config validation mỗi field, undo/redo dùng command pattern để lưu lịch sử thao tác, và khả năng export form data cùng generate endpoint nhận submissions.

## Detailed Answer (EN)
A form builder needs two primary modes: Edit mode (drag-and-drop field types onto a canvas) and Preview mode (shows what the end user will see). For drag-and-drop, use @dnd-kit — lightweight, accessible, React-friendly, and actively maintained (react-beautiful-dnd was deprecated by Atlassian in 2023). The core architecture should be schema-driven: each form is a JSON schema with a component registry mapping field types to React components. Advanced features: a validation rules engine per field, undo/redo using the command pattern, and the ability to export form data and generate a submission endpoint.
