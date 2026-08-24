---
id: docker-va-deployment-nestjs-multi-stage-build-va-containerization
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker và deployment NestJS — multi-stage build và containerization?

## Question (EN)
Docker and NestJS deployment — multi-stage build and containerization?

## Đáp án chi tiết (VI)
**Multi-stage Dockerfile** để minimize production image size:\
```dockerfile\
# Stage 1: Build\
FROM node:20-alpine AS builder\
WORKDIR /app\
COPY package*.json pnpm-lock.yaml ./\
RUN npm install -g pnpm \u0026\u0026 pnpm install --frozen-lockfile\
COPY . .\
RUN pnpm build\
\
# Stage 2: Production\
FROM node:20-alpine AS production\
WORKDIR /app\
# Chỉ copy prod dependencies\
COPY --from=builder /app/dist ./dist\
COPY --from=builder /app/node_modules ./node_modules\
COPY --from=builder /app/package.json .\
\
# Non-root user\
RUN addgroup -g 1001 -S nodejs \u0026\u0026 adduser -S nestjs -u 1001\
USER nestjs\
\
EXPOSE 3000\
CMD [\\"node\\

## Detailed Answer (EN)
**Multi-stage Dockerfile** to minimize production image:\
```dockerfile\
FROM node:20-alpine AS builder\
WORKDIR /app\
COPY package*.json pnpm-lock.yaml ./\
RUN npm install -g pnpm \u0026\u0026 pnpm install --frozen-lockfile\
COPY . .\
RUN pnpm build\
\
FROM node:20-alpine AS production\
WORKDIR /app\
COPY --from=builder /app/dist ./dist\
COPY --from=builder /app/node_modules ./node_modules\
RUN adduser -S nestjs -u 1001\
USER nestjs\
CMD [\\"node\\
