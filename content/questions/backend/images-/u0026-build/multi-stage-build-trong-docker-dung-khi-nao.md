---
id: multi-stage-build-trong-docker-dung-khi-nao
position: backend
technology: images-\u0026-build
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multi-stage build trong Docker dùng khi nào?

## Question (EN)
When should you use Docker multi-stage builds?

## Đáp án chi tiết (VI)
Multi-stage build tách stage build và stage runtime. Stage build chứa compiler, dev dependencies và artifacts tạm; stage runtime chỉ copy output cần chạy. Kết quả là image nhỏ hơn, ít surface security hơn và deploy nhanh hơn.\
\
Ví dụ:\
```\
FROM node:22-alpine AS build\
WORKDIR /app\
COPY package.json pnpm-lock.yaml ./\
RUN corepack enable \u0026\u0026 pnpm install --frozen-lockfile\
COPY . .\
RUN pnpm build\
\
FROM node:22-alpine AS runtime\
WORKDIR /app\
COPY --from=build /app/.next ./.next\
COPY --from=build /app/package.json ./package.json\
CMD [\\"node\\

## Detailed Answer (EN)
Multi-stage builds separate the build stage from the runtime stage. The build stage contains compilers, dev dependencies and temporary artifacts; the runtime stage copies only what is needed to run. The result is a smaller image, less security surface and faster deploys.\
\
Example:\
```\
FROM node:22-alpine AS build\
WORKDIR /app\
COPY package.json pnpm-lock.yaml ./\
RUN corepack enable \u0026\u0026 pnpm install --frozen-lockfile\
COPY . .\
RUN pnpm build\
\
FROM node:22-alpine AS runtime\
WORKDIR /app\
COPY --from=build /app/.next ./.next\
COPY --from=build /app/package.json ./package.json\
CMD [\\"node\\
