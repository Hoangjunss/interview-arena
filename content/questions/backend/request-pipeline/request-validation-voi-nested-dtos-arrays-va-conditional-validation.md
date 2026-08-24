---
id: request-validation-voi-nested-dtos-arrays-va-conditional-validation
position: backend
technology: request-pipeline
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Request validation với nested DTOs, arrays và conditional validation?

## Question (EN)
Request validation with nested DTOs, arrays, and conditional validation?

## Đáp án chi tiết (VI)
**Nested DTOs** với `@ValidateNested()` và `@Type()`:\
```typescript\
import { ValidateNested, IsArray, ArrayMinSize } from 'class-validator';\
import { Type } from 'class-transformer';\
\
class AddressDto {\
  @IsString() @Length(2, 100)\
  street: string;\
\
  @IsString() @IsPostalCode('VN')\
  zipCode: string;\
}\
\
class CreateUserDto {\
  @IsString() @MinLength(2)\
  name: string;\
\
  @ValidateNested()    // Validate nested object\
  @Type(() =\u003e AddressDto)  // Phải có @Type để transform\
  address: AddressDto;\
\
  @IsArray()\
  @ArrayMinSize(1)\
  @ValidateNested({ each: true })  // Validate từng item\
  @Type(() =\u003e AddressDto)\
  addresses: AddressDto[];\
}\
```\
\
**Conditional validation** với `@ValidateIf()`:\
```typescript\
@IsOptional()\
paymentMethod?: string;\
\
@ValidateIf(obj =\u003e obj.paymentMethod === 'CREDIT_CARD')\
@IsCreditCard()\
cardNumber?: string;  // Chỉ validate nếu paymentMethod là CREDIT_CARD\
```\
\
Lưu ý: `@Type(() =\u003e NestedClass)` là bắt buộc cho `@ValidateNested()` — thiếu thì validation bỏ qua nested object.

## Detailed Answer (EN)
**Nested DTOs** with `@ValidateNested()` and `@Type()`:\
```typescript\
class CreateUserDto {\
  @ValidateNested()\
  @Type(() =\u003e AddressDto)\
  address: AddressDto;\
\
  @ValidateNested({ each: true })\
  @Type(() =\u003e AddressDto)\
  addresses: AddressDto[];\
}\
```\
\
**Conditional validation** with `@ValidateIf()`:\
```typescript\
@ValidateIf(obj =\u003e obj.paymentMethod === 'CREDIT_CARD')\
@IsCreditCard()\
cardNumber?: string;\
```\
\
Pitfall: `@Type(() =\u003e NestedClass)` is mandatory for `@ValidateNested()` — without it, nested validation is skipped.
