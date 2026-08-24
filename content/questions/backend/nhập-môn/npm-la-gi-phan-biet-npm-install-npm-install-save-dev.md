---
id: npm-la-gi-phan-biet-npm-install-npm-install-save-dev
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
npm là gì? Phân biệt npm install, npm install --save-dev?

## Question (EN)
What is npm? What is the difference between npm install and npm install --save-dev?

## Đáp án chi tiết (VI)
dependencies cho production; devDependencies cho build/test tools (không được bundle vào production) — `npm ci` trong CI/CD đảm bảo deterministic install từ lock file. npm (Node Package Manager) là công cụ quản lý packages mặc định đi kèm Node.js, với registry hơn 2 triệu packages. Phân biệt quan trọng: `npm install react` cài vào `dependencies` — những gì cần thiết để app chạy trên production. `npm install --save-dev jest typescript eslint` cài vào `devDependencies` — chỉ cần trong quá trình development, không được bundle vào production build. Ví dụ thực tế: khi deploy lên server, chạy `npm install --production` sẽ bỏ qua devDependencies, giảm đáng kể dung lượng `node_modules`. Lưu ý hay gặp: cài nhầm package production vào devDependencies (app crash trên server) hoặc ngược lại (bloat production bundle). Ngoài npm còn có pnpm (nhanh hơn, tiết kiệm disk) và yarn đang được dùng phổ biến.

## Detailed Answer (EN)
dependencies for production; devDependencies for build/test tools (not bundled into production) — `npm ci` in CI/CD ensures deterministic install from the lock file. npm (Node Package Manager) is the default package manager bundled with Node.js, with a registry of over 2 million packages. Key distinction: `npm install react` installs to `dependencies` — things the app needs to run in production. `npm install --save-dev jest typescript eslint` installs to `devDependencies` — only needed during development, not bundled into the production build. Practical example: when deploying to a server, running `npm install --production` skips devDependencies, significantly reducing `node_modules` size. Common pitfall: installing a production package into devDependencies (app crashes on server) or vice versa (bloated production bundle). Besides npm, pnpm (faster, disk-efficient) and Yarn are also widely used.
