---
id: cach-tich-hop-typeorm-voi-nestjs-repository-pattern-hoat-dong-nhu-the-nao
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tích hợp TypeORM với NestJS? Repository pattern hoạt động như thế nào?

## Question (EN)
How to integrate TypeORM with NestJS? How does the Repository pattern work?

## Đáp án chi tiết (VI)
TypeORM là một trong những ORM phổ biến nhất với NestJS (Prisma cũng được ưa chuộng trong các project mới), sử dụng Data Mapper pattern thông qua Repository. Setup với `TypeOrmModule.forRoot()` trong `AppModule` cấu hình connection (type, host, port, credentials, entities path), `synchronize: false` trong production — dùng migrations thay.\
\
Entity định nghĩa bằng `@Entity()` decorator với các column decorators: `@PrimaryGeneratedColumn()`, `@Column()`, `@CreateDateColumn()`, `@UpdateDateColumn()`. Relations: `@OneToMany()`, `@ManyToOne()`, `@ManyToMany()`, `@OneToOne()`.\
\
Trong feature module, `TypeOrmModule.forFeature([Entity])` đăng ký Repository. Service inject `@InjectRepository(Entity)` để dùng `Repository\u003cEntity\u003e` với các methods: `find()`, `findOne({ where: { id } })`, `create()`, `save()`, `update()`, `delete()`. Lưu ý: TypeORM 0.3+ yêu cầu `findOne()` phải có `{ where: {...} }`. Query Builder cho queries phức tạp: `createQueryBuilder('alias').leftJoinAndSelect().where().getMany()`.

## Detailed Answer (EN)
TypeORM is one of the most popular ORMs for NestJS (Prisma is now preferred for new projects in the community). It uses the Data Mapper pattern via Repository. Set up with `TypeOrmModule.forRoot()` in `AppModule` to configure the connection. Use `synchronize: false` in production — use migrations instead.\
\
Entities are defined with the `@Entity()` decorator and column decorators: `@PrimaryGeneratedColumn()`, `@Column()`, `@CreateDateColumn()`, `@UpdateDateColumn()`. Relations: `@OneToMany()`, `@ManyToOne()`, `@ManyToMany()`, `@OneToOne()`.\
\
In feature modules, `TypeOrmModule.forFeature([Entity])` registers the Repository. Services inject `@InjectRepository(Entity)` to use `Repository\u003cEntity\u003e` with methods: `find()`, `findOne({ where: { id } })`, `create()`, `save()`, `update()`, `delete()`. Note: TypeORM 0.3+ requires `findOne()` to include `{ where: {...} }`. Query Builder handles complex queries: `createQueryBuilder('alias').leftJoinAndSelect().where().getMany()`.
