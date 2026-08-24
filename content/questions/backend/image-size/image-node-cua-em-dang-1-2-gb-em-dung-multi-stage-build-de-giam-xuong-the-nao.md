---
id: image-node-cua-em-dang-1-2-gb-em-dung-multi-stage-build-de-giam-xuong-the-nao
position: backend
technology: image-size
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Image Node của em đang 1.2 GB. Em dùng multi-stage build để giảm xuống thế nào?

## Question (EN)
My Node image is 1.2 GB. How do I use a multi-stage build to shrink it?

## Đáp án chi tiết (VI)
Ý tưởng: **stage build chứa toolchain, stage runtime chỉ chứa artifact**. Chỉ layer của stage cuối đi vào image xuất ra — mọi thứ ở stage trước (devDependency, compiler, source TS) bị bỏ lại.\
\
```dockerfile\
FROM node:22-slim AS build\
WORKDIR /app\
COPY package.json package-lock.json ./\
RUN npm ci\
COPY . .\
RUN npm run build\
\
FROM node:22-slim AS runtime\
WORKDIR /app\
ENV NODE_ENV=production\
COPY package.json package-lock.json ./\
RUN npm ci --omit=dev \u0026\u0026 npm cache clean --force\
COPY --from=build /app/dist ./dist\
USER node\
CMD [\\"node\\

## Detailed Answer (EN)
The idea: **the build stage holds the toolchain, the runtime stage holds only the artifact**. Only the final stage's layers end up in the exported image — everything from earlier stages (devDependencies, compilers, TS sources) is left behind.\
\
```dockerfile\
FROM node:22-slim AS build\
WORKDIR /app\
COPY package.json package-lock.json ./\
RUN npm ci\
COPY . .\
RUN npm run build\
\
FROM node:22-slim AS runtime\
WORKDIR /app\
ENV NODE_ENV=production\
COPY package.json package-lock.json ./\
RUN npm ci --omit=dev \u0026\u0026 npm cache clean --force\
COPY --from=build /app/dist ./dist\
USER node\
CMD [\\"node\\
