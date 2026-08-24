---
id: ma-hoa-at-rest-va-in-transit-khac-nhau-the-nao-co-tls-roi-thi-con-can-ma-hoa-du
position: backend
technology: cryptography
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mã hoá at-rest và in-transit khác nhau thế nào? Có TLS rồi thì còn cần mã hoá dữ liệu trong DB không?

## Question (EN)
What is the difference between encryption at rest and in transit? If we already have TLS, do we still need to encrypt data in the database?

## Đáp án chi tiết (VI)
Hai lớp bảo vệ hai mối đe doạ khác nhau, không thay thế nhau.\
\
- **In-transit**: bảo vệ dữ liệu **khi đang đi trên đường** — trình duyệt tới server, service tới service, app tới database. Cơ chế là **TLS** (HTTPS, `sslmode=require` khi nối Postgres). Chống nghe lén và chống người đứng giữa sửa gói tin.\
- **At-rest**: bảo vệ dữ liệu **khi nằm im trên đĩa** — file DB, backup, snapshot, log. Cơ chế là disk/volume encryption của nhà cung cấp hoặc TDE của DB. Chống việc ai đó lấy được ổ đĩa, file backup hay snapshot.\
\
**Vẫn cần cả hai.** TLS không giúp gì nếu bản backup `.sql` bị tải về từ một bucket cấu hình public. Ngược lại disk encryption không giúp gì nếu API trả dữ liệu qua HTTP thường.\
\
Lưu ý: disk encryption của cloud là mặc định gần như miễn phí và **trong suốt với ứng dụng** — nghĩa là bất cứ ai query được DB vẫn đọc được dữ liệu rõ. Muốn chống cả trường hợp đó thì phải mã hoá **ở mức trường** trong ứng dụng, đó là bài toán khác.

## Detailed Answer (EN)
They defend two different threats and do not substitute for each other.\
\
- **In transit**: protects data **while it moves** — browser to server, service to service, app to database. The mechanism is **TLS** (HTTPS, `sslmode=require` for Postgres). It stops eavesdropping and on-path tampering.\
- **At rest**: protects data **sitting on disk** — DB files, backups, snapshots, logs. The mechanism is provider disk/volume encryption or the database's TDE. It stops someone who obtains a drive, a backup file, or a snapshot.\
\
**You need both.** TLS does nothing if a `.sql` backup is downloaded from a misconfigured public bucket. Conversely disk encryption does nothing if the API serves data over plain HTTP.\
\
Note: cloud disk encryption is essentially free and **transparent to the application** — meaning anyone who can query the DB still reads plaintext. Defending against that requires **field-level** encryption in the application, which is a separate problem.
