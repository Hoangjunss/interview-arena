---
id: props-vs-state-trong-rn-co-khac-biet-nao-so-voi-react-web-khong
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Props vs State trong RN có khác biệt nào so với React web không?

## Question (EN)
Are props vs state any different in RN compared with React on the web?

## Đáp án chi tiết (VI)
Hoàn toàn không khác — đây là React core, RN không can thiệp. Props vẫn là dữ liệu cha truyền xuống, immutable từ phía con. State vẫn local, mutable qua `setState`/`useState`, trigger re-render khi đổi.\
\
Vài điểm cần lưu ý đặc thù RN:\
- **Performance impact lớn hơn:** mỗi re-render RN phải thông qua native side để cập nhật UIView — list lớn re-render lặp gây jank rõ rệt hơn web. Vì vậy `React.memo`/`useCallback` quan trọng hơn web.\
- **State persist:** state mất khi user kill app. Nếu cần giữ (vd login token), persist vào AsyncStorage/MMKV.\
- **Props drilling cross-screen:** vì navigation không phải parent-child relationship, không thể truyền prop xuyên screen — dùng route params, context, hoặc store toàn cục.\
- **`useState` initializer pattern:** `useState(() =\u003e expensiveCompute())` quan trọng trên RN vì khởi tạo chậm sẽ block JS thread → chậm transition.

## Detailed Answer (EN)
Not really — this is React core, RN does not interfere. Props are still parent-down data, immutable from the child's side. State is still local, mutable via `setState`/`useState`, triggering re-render on change.\
\
A few RN-specific considerations:\
- **Larger performance impact:** every re-render must round-trip to native to update UIView — repeated re-renders in large lists jank more visibly than on the web. `React.memo`/`useCallback` matter more.\
- **State persistence:** state vanishes when the user kills the app. Persist things like auth tokens to AsyncStorage/MMKV.\
- **No cross-screen prop drilling:** because navigation is not a parent-child relationship, you cannot pass props across screens — use route params, context, or a global store.\
- **`useState` initializer pattern:** `useState(() =\u003e expensiveCompute())` matters more in RN — slow init blocks the JS thread and stalls transitions.
