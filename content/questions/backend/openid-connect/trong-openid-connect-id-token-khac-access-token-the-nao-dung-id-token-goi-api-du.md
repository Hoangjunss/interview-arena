---
id: trong-openid-connect-id-token-khac-access-token-the-nao-dung-id-token-goi-api-du
position: backend
technology: openid-connect
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong OpenID Connect, `id_token` khác `access_token` thế nào? Dùng `id_token` gọi API được không?

## Question (EN)
In OpenID Connect, how does the `id_token` differ from the `access_token`? Can you call an API with the `id_token`?

## Đáp án chi tiết (VI)
Hai token phục vụ hai mục đích khác nhau:\
\
| | `id_token` | `access_token` |\
|---|---|---|\
| Trả lời câu hỏi | User này **là ai** (authentication) | Bearer được **làm gì** (authorization) |\
| Đối tượng nhận (`aud`) | Chính client app | Resource server / API |\
| Định dạng | Luôn là **JWT** có chữ ký | Do provider quyết định — có thể là chuỗi đục (opaque) |\
\
`id_token` chứa các claim chuẩn: `iss`, `sub` (id ổn định của user), `aud`, `exp`, `iat`, `nonce`, cộng thêm `email`, `name` nếu scope cho phép.\
\
**Không dùng `id_token` để gọi API.** Nó được phát cho client, không phải cho resource server; API nhận `id_token` mà chấp nhận là bỏ qua kiểm tra `aud` — nghĩa là token do một app khác cùng provider phát ra cũng lọt. Đúng bản chất: `id_token` dùng để **tạo phiên đăng nhập** phía client rồi vứt đi, `access_token` mới là thứ đính kèm `Authorization: Bearer`.\
\
Khi verify `id_token` phải kiểm: chữ ký (JWKS của provider), `iss` khớp, `aud` khớp `client_id`, `exp` chưa hết hạn, `nonce` khớp giá trị đã gửi.

## Detailed Answer (EN)
$83
