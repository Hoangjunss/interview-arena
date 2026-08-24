---
id: getstaticprops-va-getserversideprops-khac-nhau-nhu-the-nao
position: backend
technology: rendering
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
getStaticProps và getServerSideProps khác nhau như thế nào?

## Question (EN)
How do getStaticProps and getServerSideProps differ?

## Đáp án chi tiết (VI)
getStaticProps chạy tại build time, data embed vào static HTML, tốc độ cực nhanh, tốt cho data ít thay đổi. getServerSideProps chạy mỗi request, data luôn fresh, nhưng chậm hơn vì phải đợi server. Cả hai chỉ có trong Pages Router. App Router thay thế bằng Server Components với fetch cache options.

## Detailed Answer (EN)
getStaticProps runs at build time, embeds data into the static HTML, is extremely fast, and is best for data that changes infrequently. getServerSideProps runs on every request so data is always fresh, but it is slower because the server must respond first. Both are Pages Router only. The App Router replaces them with Server Components and fetch cache options.
