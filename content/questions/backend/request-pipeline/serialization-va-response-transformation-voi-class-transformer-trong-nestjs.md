---
id: serialization-va-response-transformation-voi-class-transformer-trong-nestjs
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Serialization và response transformation với class-transformer trong NestJS?

## Question (EN)
Serialization and response transformation with class-transformer in NestJS?

## Đáp án chi tiết (VI)
**class-transformer** cùng với `ClassSerializerInterceptor` tự động serialize/exclude fields trong response.\
\
**Exclude sensitive fields** (password, tokens):\
```typescript\
import { Exclude, Expose, Transform } from 'class-transformer';\
\
export class UserEntity {\
  id: number;\
  email: string;\
\
  @Exclude()  // Không expose trong response\
  password: string;\
\
  @Expose()\
  @Transform(({ value }) =\u003e value?.toISOString())\
  createdAt: Date;\
\
  constructor(partial: Partial\u003cUserEntity\u003e) {\
    Object.assign(this, partial);\
  }\
}\
```\
\
**Enable globally**:\
```typescript\
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));\
```\
\
**Controller return entity**:\
```typescript\
@Get(':id')\
async findOne(@Param('id') id: number): Promise\u003cUserEntity\u003e {\
  const user = await this.usersService.findOne(id);\
  return new UserEntity(user);  // Wrap trong entity class\
}\
```\
\
Lưu ý: plain objects không bị transform — phải trả về instance của entity class để decorator có effect.

## Detailed Answer (EN)
**class-transformer** with `ClassSerializerInterceptor` auto-serializes/excludes fields.\
\
```typescript\
export class UserEntity {\
  id: number;\
  email: string;\
\
  @Exclude()\
  password: string;\
\
  constructor(partial: Partial\u003cUserEntity\u003e) {\
    Object.assign(this, partial);\
  }\
}\
\
// Enable globally\
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));\
\
// Controller — must return class instance\
@Get(':id')\
async findOne(@Param('id') id: number): Promise\u003cUserEntity\u003e {\
  return new UserEntity(await this.usersService.findOne(id));\
}\
```\
\
Pitfall: plain objects are not transformed — must return entity class instances.
