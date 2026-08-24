---
id: grpc-trong-nestjs-setup-va-so-sanh-voi-rest
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
gRPC trong NestJS — setup và so sánh với REST?

## Question (EN)
gRPC in NestJS — setup and comparison with REST?

## Đáp án chi tiết (VI)
gRPC là high-performance RPC framework dùng Protocol Buffers (protobuf) thay vì JSON — phù hợp cho internal microservice communication.\
\
**Setup**:\
```typescript\
// main.ts — gRPC microservice\
app.connectMicroservice\u003cMicroserviceOptions\u003e({\
  transport: Transport.GRPC,\
  options: {\
    package: 'users',\
    protoPath: join(__dirname, 'users.proto'),\
    url: '0.0.0.0:5000',\
  },\
});\
\
// Controller\
@GrpcMethod('UsersService', 'FindOne')\
findOne(data: { id: number }): UserMessage {\
  return this.usersService.findOne(data.id);\
}\
```\
\
**proto file**:\
```protobuf\
service UsersService {\
  rpc FindOne (FindOneRequest) returns (User);\
  rpc FindAll (Empty) returns (UsersResponse);\
}\
```\
\
**So sánh gRPC vs REST**:\
- gRPC: binary (nhỏ hơn 3-10x), strongly typed, bidirectional streaming, HTTP/2\
- REST: text-based JSON, human-readable, universal browser support, simpler\
\
Dùng gRPC cho: internal microservice-to-microservice communication có throughput cao. Dùng REST cho: public APIs, browser clients.

## Detailed Answer (EN)
gRPC uses Protocol Buffers instead of JSON — ideal for internal microservice communication.\
\
```typescript\
app.connectMicroservice({ transport: Transport.GRPC, options: { package: 'users', protoPath: 'users.proto', url: '0.0.0.0:5000' } });\
\
@GrpcMethod('UsersService', 'FindOne')\
findOne(data: { id: number }): UserMessage { ... }\
```\
\
**gRPC vs REST**:\
- gRPC: binary (3-10x smaller), strongly typed, bidirectional streaming, HTTP/2\
- REST: JSON, human-readable, universal browser support, simpler\
\
Use gRPC for: high-throughput internal microservice communication. Use REST for: public APIs, browser clients.
