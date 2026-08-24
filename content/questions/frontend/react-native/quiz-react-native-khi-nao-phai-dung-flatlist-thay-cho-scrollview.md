---
id: quiz-react-native-khi-nao-phai-dung-flatlist-thay-cho-scrollview
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào phải dùng FlatList thay cho ScrollView?

## Đáp án trắc nghiệm
- [ ] Khi cần kéo xuống để làm mới nội dung
- [ ] Khi danh sách cần cuộn theo chiều ngang
- [ ] Khi các phần tử có chiều cao khác nhau
- [x] Khi danh sách dài hoặc chưa rõ số phần tử

## Giải thích (VI)
ScrollView dựng toàn bộ phần tử con ngay khi hiển thị, nên danh sách dài làm màn hình khựng và tốn bộ nhớ. FlatList chỉ dựng phần đang nhìn thấy cộng một vùng đệm, và tự thu hồi phần đã cuộn qua.

### Giải thích các phương án:
- **Khi cần kéo xuống để làm mới nội dung** (Sai): ScrollView cũng nhận được thành phần làm mới.
- **Khi danh sách cần cuộn theo chiều ngang** (Sai): ScrollView cũng cuộn ngang được.
- **Khi các phần tử có chiều cao khác nhau** (Sai): Cả hai đều xử lý được phần tử cao thấp khác nhau.
- **Khi danh sách dài hoặc chưa rõ số phần tử** (Đúng): FlatList chỉ dựng phần đang nhìn thấy, còn ScrollView dựng toàn bộ con ngay lập tức.
