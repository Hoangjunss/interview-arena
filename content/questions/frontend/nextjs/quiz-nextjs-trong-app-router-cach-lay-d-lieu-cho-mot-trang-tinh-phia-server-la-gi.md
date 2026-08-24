---
id: quiz-nextjs-trong-app-router-cach-lay-d-lieu-cho-mot-trang-tinh-phia-server-la-gi
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong App Router, cách lấy dữ liệu cho một trang tĩnh phía server là gì?

## Đáp án trắc nghiệm
- [x] Khai báo component là async rồi await ngay trong thân nó
- [ ] Dùng useEffect để gọi API sau khi component mount
- [ ] Vẫn export getServerSideProps như trước, App Router giữ nguyên API này
- [ ] Phải tạo một Route Handler rồi gọi fetch tới chính nó

## Giải thích (VI)
Cho component async và await trực tiếp. Server Component chạy trên server nên gọi thẳng database hay API nội bộ được. getServerSideProps và getStaticProps chỉ thuộc Pages Router, không dùng trong App Router.

### Giải thích các phương án:
- **Khai báo component là async rồi await ngay trong thân nó** (Đúng): Không còn getServerSideProps hay getStaticProps như Pages Router. Server Component async được nên lấy dữ liệu ngay trong component là cách chuẩn.
- **Dùng useEffect để gọi API sau khi component mount** (Sai): Cách này chạy ở client, làm mất lợi ích của server rendering và tạo waterfall.
- **Vẫn export getServerSideProps như trước, App Router giữ nguyên API này** (Sai): Hai hàm đó chỉ tồn tại trong Pages Router và không hoạt động trong App Router.
- **Phải tạo một Route Handler rồi gọi fetch tới chính nó** (Sai): Server Component gọi thẳng nguồn dữ liệu được, không cần vòng qua API.
