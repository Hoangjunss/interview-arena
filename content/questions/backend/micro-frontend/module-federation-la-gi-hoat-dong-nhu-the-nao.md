---
id: module-federation-la-gi-hoat-dong-nhu-the-nao
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module Federation là gì? Hoạt động như thế nào?

## Question (EN)
What is Module Federation? How does it work?

## Đáp án chi tiết (VI)
Module Federation là tính năng của Webpack 5 cho phép một app (host) nạp code từ app khác (remote) ngay lúc runtime, kèm cơ chế chia sẻ dependency — đây là nền tảng phổ biến nhất để dựng micro-frontend hiện nay. Remote khai báo những module nó chia sẻ ra ngoài (`exposes`); host khai báo các `remotes` muốn dùng và `shared` để dùng chung một bản thư viện như React.\
\
```js\
// remote (app product)\
new ModuleFederationPlugin({\
  name: 'product', filename: 'remoteEntry.js',\
  exposes: { './Card': './src/Card' },\
  shared: { react: { singleton: true } },\
})\
```\
\
Host import động `product/Card` qua URL của `remoteEntry.js`. Rspack và Vite cũng có plugin tương đương. Lưu ý: nếu cấu hình `shared` sai (không đặt `singleton: true`) thì host và remote nạp hai bản React khác nhau → lỗi \\"invalid hook call\\".

## Detailed Answer (EN)
Module Federation is a Webpack 5 feature that lets one app (the host) load code from another app (a remote) at runtime, with a mechanism for sharing dependencies — it is the most common foundation for building micro-frontends today. A remote declares the modules it lends out (`exposes`); the host declares the `remotes` it wants and the `shared` deps to use a single copy of a library like React.\
\
```js\
// remote (product app)\
new ModuleFederationPlugin({\
  name: 'product', filename: 'remoteEntry.js',\
  exposes: { './Card': './src/Card' },\
  shared: { react: { singleton: true } },\
})\
```\
\
The host dynamically imports `product/Card` via the remote's `remoteEntry.js` URL. Rspack and Vite have equivalent plugins. Note: if `shared` is misconfigured (no `singleton: true`), the host and remote load two different copies of React → an \\"invalid hook call\\" error.
