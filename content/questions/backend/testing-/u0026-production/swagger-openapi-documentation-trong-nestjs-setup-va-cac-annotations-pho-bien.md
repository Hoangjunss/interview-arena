---
id: swagger-openapi-documentation-trong-nestjs-setup-va-cac-annotations-pho-bien
position: backend
technology: testing-\u0026-production
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Swagger / OpenAPI documentation trong NestJS — setup và các annotations phổ biến?

## Question (EN)
Swagger / OpenAPI documentation in NestJS — setup and common annotations?

## Đáp án chi tiết (VI)
NestJS tích hợp Swagger qua `@nestjs/swagger`. Setup trong `main.ts`: `DocumentBuilder` cấu hình title/description/version/auth, `SwaggerModule.createDocument()` tạo document, `SwaggerModule.setup('api/docs', app, document)` serve UI.\
\
Annotations trên DTO: `@ApiProperty({ example, description })` cho required fields, `@ApiPropertyOptional()` cho optional fields. Hỗ trợ `enum`, `type`, `minLength`, `maxLength`, `default`.\
\
Annotations trên Controller: `@ApiTags('GroupName')` nhóm endpoints trong Swagger UI, `@ApiBearerAuth()` chỉ định cần JWT, `@ApiOperation({ summary })` mô tả endpoint, `@ApiResponse({ status, type, description })` document các response codes. Param annotations: `@ApiParam()` cho route params, `@ApiQuery()` cho query params. `PickType`, `OmitType`, `PartialType` từ `@nestjs/swagger` để tạo derived DTOs tái sử dụng schema.

## Detailed Answer (EN)
NestJS integrates Swagger via `@nestjs/swagger`. Setup in `main.ts`: use `DocumentBuilder` to configure title/description/version/auth, `SwaggerModule.createDocument()` to build the document, `SwaggerModule.setup('api/docs', app, document)` to serve the UI.\
\
DTO annotations: `@ApiProperty({ example, description })` for required fields, `@ApiPropertyOptional()` for optional fields. Supports `enum`, `type`, `minLength`, `maxLength`, `default`.\
\
Controller annotations: `@ApiTags('GroupName')` groups endpoints in the Swagger UI, `@ApiBearerAuth()` marks JWT requirement, `@ApiOperation({ summary })` describes the endpoint, `@ApiResponse({ status, type, description })` documents response codes. Param annotations: `@ApiParam()` for route params, `@ApiQuery()` for query params. Use `PickType`, `OmitType`, `PartialType` from `@nestjs/swagger` to create derived DTOs that reuse the schema.
