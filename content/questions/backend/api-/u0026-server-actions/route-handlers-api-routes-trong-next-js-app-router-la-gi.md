---
id: route-handlers-api-routes-trong-next-js-app-router-la-gi
position: backend
technology: api-\u0026-server-actions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Route Handlers (API Routes) trong Next.js App Router là gì?

## Question (EN)
What are Route Handlers (API Routes) in the Next.js App Router?

## Đáp án chi tiết (VI)
Route Handlers là cách tạo API endpoints trong App Router bằng cách đặt file route.ts trong thư mục app/. Mỗi HTTP method được export dưới dạng named function riêng biệt. Sử dụng Web APIs chuẩn (Request/Response) thay vì req/res của Node.js.\
```typescript\
// app/api/users/route.ts → endpoint: /api/users\
\
import { NextRequest, NextResponse } from 'next/server'\
\
export async function GET(request: NextRequest) {\
  const { searchParams } = new URL(request.url)\
  const page = Number(searchParams.get('page') ?? 1)\
  const users = await db.users.findMany({ skip: (page - 1) * 10, take: 10 })\
  return NextResponse.json(users)\
}\
\
export async function POST(request: NextRequest) {\
  const body = await request.json()\
  const user = await db.users.create({ data: body })\
  return NextResponse.json(user, { status: 201 })\
}\
```

## Detailed Answer (EN)
Route Handlers are how you create API endpoints in the App Router by placing a route.ts file inside any directory under app/. Each HTTP method is exported as a named function. They use standard Web APIs (Request/Response) instead of Node.js req/res.\
```typescript\
// app/api/users/route.ts → endpoint: /api/users\
\
import { NextRequest, NextResponse } from 'next/server'\
\
export async function GET(request: NextRequest) {\
  const { searchParams } = new URL(request.url)\
  const page = Number(searchParams.get('page') ?? 1)\
  const users = await db.users.findMany({ skip: (page - 1) * 10, take: 10 })\
  return NextResponse.json(users)\
}\
\
export async function POST(request: NextRequest) {\
  const body = await request.json()\
  const user = await db.users.create({ data: body })\
  return NextResponse.json(user, { status: 201 })\
}\
```
