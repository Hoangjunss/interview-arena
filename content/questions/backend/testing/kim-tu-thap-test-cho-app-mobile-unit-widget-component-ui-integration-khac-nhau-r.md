---
id: kim-tu-thap-test-cho-app-mobile-unit-widget-component-ui-integration-khac-nhau-r
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kim tự tháp test cho app mobile: unit, widget/component, UI/integration khác nhau ra sao?

## Question (EN)
The mobile test pyramid: how do unit, widget/component, and UI/integration tests differ?

## Đáp án chi tiết (VI)
Chiến lược test mobile theo **kim tự tháp**: nhiều test nhanh ở dưới, ít test chậm ở trên.\
\
- **Unit test** (đáy, nhiều nhất): kiểm tra một hàm/class/logic riêng lẻ, **mock phụ thuộc**. Chạy rất nhanh, chi phí thấp, nhưng độ tin cậy tổng thể thấp. Hợp cho business logic, ViewModel/BLoC, helper.\
- **Widget / component test** (giữa): kiểm tra **một widget/component UI** — render và tương tác (nhấn, nhập) mà không cần thiết bị thật. Trong Flutter là `flutter_test` với `WidgetTester`; RN dùng React Native Testing Library; Android dùng Compose UI test/Robolectric.\
- **Integration / UI test** (đỉnh, ít nhất): chạy **cả app hoặc phần lớn** trên thiết bị/emulator, kiểm tra các phần phối hợp end-to-end. Tin cậy cao nhất nhưng chậm và tốn bảo trì (Flutter `integration_test`, Android Espresso, RN Detox/Maestro).\
\
Hay hỏi: vì sao nên nhiều unit ít e2e, và mock vs fake khi test.

## Detailed Answer (EN)
Mobile testing follows a **pyramid**: many fast tests at the bottom, few slow ones at the top.\
\
- **Unit tests** (base, most numerous): test a single function/class/logic in isolation with **mocked dependencies**. Very fast, low cost, but low overall confidence. Good for business logic, ViewModel/BLoC, helpers.\
- **Widget / component tests** (middle): test **a single UI widget/component** — rendering and interaction (tap, type) without a real device. Flutter uses `flutter_test` with `WidgetTester`; RN uses React Native Testing Library; Android uses Compose UI test/Robolectric.\
- **Integration / UI tests** (top, fewest): run the **whole app or a large part** on a device/emulator, checking pieces work together end-to-end. Highest confidence but slow and maintenance-heavy (Flutter `integration_test`, Android Espresso, RN Detox/Maestro).\
\
Common ask: why favor many unit and few e2e tests, and mock vs fake in tests.
