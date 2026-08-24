---
id: quiz-react-danh-sach-todos-cho-phep-xoa-phan-tu-o-dau-cach-dat-key-duoi-day-co-van-de-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Danh sách todos cho phép xoá phần tử ở đầu. Cách đặt key dưới đây có vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Dùng index làm key khiến toàn bộ danh sách bị unmount và mount lại mỗi lần render
- [x] Khi xoá phần tử đầu, index của các phần tử sau dịch chuyển
- [ ] Không có vấn đề gì, vì key chỉ cần tồn tại để tắt warning của React
- [ ] React sẽ báo lỗi runtime vì key bắt buộc phải là string ID duy nhất toàn ứng dụng

## Giải thích (VI)
Dùng index làm key là vấn đề khi danh sách có thể thêm/xoá/đổi thứ tự: xoá phần tử đầu làm index các phần tử sau dịch lên, React match nhầm item giữa hai lần render, khiến local state (input đang gõ, checkbox, focus) gắn sai dòng. Nên dùng ID ổn định từ dữ liệu, ví dụ todo.id.

### Giải thích các phương án:
- **Dùng index làm key khiến toàn bộ danh sách bị unmount và mount lại mỗi lần render** (Sai): Ngược lại: index key khiến React giữ lại DOM node quá mức và gán nhầm nội dung, chứ không phá huỷ toàn bộ danh sách.
- **Khi xoá phần tử đầu, index của các phần tử sau dịch chuyển** (Đúng): React match nhầm item cũ với item mới, khiến local state/focus của TodoItem gắn sai dòng. Đúng: key theo index không định danh phần tử theo dữ liệu, nên khi danh sách xê dịch, React tái sử dụng nhầm instance và state hiển thị lệch dòng.
- **Không có vấn đề gì, vì key chỉ cần tồn tại để tắt warning của React** (Sai): Key không chỉ để tắt warning — nó là định danh giúp React match phần tử giữa hai lần render; dùng index với danh sách biến động gây bug hiển thị thật.
- **React sẽ báo lỗi runtime vì key bắt buộc phải là string ID duy nhất toàn ứng dụng** (Sai): Key chỉ cần duy nhất giữa các sibling, và number index vẫn hợp lệ về mặt cú pháp — vấn đề là logic matching, không phải lỗi runtime.
