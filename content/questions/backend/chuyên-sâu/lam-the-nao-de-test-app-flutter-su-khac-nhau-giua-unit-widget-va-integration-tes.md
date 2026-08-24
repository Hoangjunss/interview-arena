---
id: lam-the-nao-de-test-app-flutter-su-khac-nhau-giua-unit-widget-va-integration-tes
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để test app Flutter? Sự khác nhau giữa unit, widget và integration test là gì?

## Question (EN)
How do you test Flutter apps? What's the difference between unit, widget, and integration tests?

## Đáp án chi tiết (VI)
Unit test kiểm tra function/class độc lập: `test('Math', () { expect(2+2, equals(4)); })`. Widget test kiểm tra widget mà không render thực: `testWidgets('Button', (tester) { await tester.tap(find.byType(Button)); })`. Integration test kiểm tra toàn bộ app trên thiết bị/emulator thật. Unit test nhanh và đáng tin cậy. Widget test phát hiện bug UI. Integration test phát hiện vấn đề thực tế. Dùng cả ba theo mô hình kim tự tháp.

## Detailed Answer (EN)
Unit tests test functions/classes in isolation. Widget tests test widgets without rendering to screen. Integration tests test the entire app on a real device/emulator. Use all three in a balanced test pyramid — unit tests are fastest and most reliable, integration tests catch real-world issues.
