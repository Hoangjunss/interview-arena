---
id: article-va-section-khac-nhau-the-nao
position: backend
technology: semantic
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003carticle\u003e` và `\u003csection\u003e` khác nhau thế nào?

## Question (EN)
How do `\u003carticle\u003e` and `\u003csection\u003e` differ?

## Đáp án chi tiết (VI)
`\u003carticle\u003e` là nội dung **đứng riêng vẫn có nghĩa**; `\u003csection\u003e` là **một phần trong mạch nội dung của trang**.\
\
```html\
\u003carticle\u003e                     \u003c!-- một bài blog, đem đi nơi khác vẫn đọc được --\u003e\
  \u003cheader\u003e\u003ch2\u003eTiêu đề bài\u003c/h2\u003e\u003c/header\u003e\
  \u003csection\u003e\u003ch3\u003ePhần 1\u003c/h3\u003e...\u003c/section\u003e\
  \u003csection\u003e\u003ch3\u003ePhần 2\u003c/h3\u003e...\u003c/section\u003e\
  \u003cfooter\u003eĐăng ngày ...\u003c/footer\u003e\
\u003c/article\u003e\
\
\u003csection\u003e                     \u003c!-- danh sách bình luận: cần context của bài --\u003e\
  \u003ch2\u003eBình luận\u003c/h2\u003e\
  \u003carticle\u003e...\u003c/article\u003e     \u003c!-- mỗi bình luận lại tự đứng được --\u003e\
  \u003carticle\u003e...\u003c/article\u003e\
\u003c/section\u003e\
```\
\
**Phép thử:** đem khối đó sang RSS feed hoặc site khác mà vẫn hiểu → `\u003carticle\u003e`. Cần trang gốc mới hiểu → `\u003csection\u003e`.\
\
Hai thẻ **lồng nhau được cả hai chiều**: article chứa section (chương mục của bài), section chứa article (danh sách card/comment).\
\
**Chốt:** card sản phẩm, tweet, comment, bài blog đều là `\u003carticle\u003e` — không phải chỉ \\"bài viết dài\\" mới dùng được thẻ này.

## Detailed Answer (EN)
`\u003carticle\u003e` is content that **still makes sense on its own**; `\u003csection\u003e` is **a part of the page's flow**.\
\
```html\
\u003carticle\u003e                     \u003c!-- a blog post: readable anywhere --\u003e\
  \u003cheader\u003e\u003ch2\u003ePost title\u003c/h2\u003e\u003c/header\u003e\
  \u003csection\u003e\u003ch3\u003ePart 1\u003c/h3\u003e...\u003c/section\u003e\
  \u003csection\u003e\u003ch3\u003ePart 2\u003c/h3\u003e...\u003c/section\u003e\
  \u003cfooter\u003ePublished ...\u003c/footer\u003e\
\u003c/article\u003e\
\
\u003csection\u003e                     \u003c!-- comment list: needs the post for context --\u003e\
  \u003ch2\u003eComments\u003c/h2\u003e\
  \u003carticle\u003e...\u003c/article\u003e     \u003c!-- each comment stands alone again --\u003e\
  \u003carticle\u003e...\u003c/article\u003e\
\u003c/section\u003e\
```\
\
**The test:** move the block into an RSS feed or another site — still understandable? `\u003carticle\u003e`. Needs the original page? `\u003csection\u003e`.\
\
The two nest **in both directions**: an article can hold sections (its chapters), a section can hold articles (a list of cards or comments).\
\
**Takeaway:** product cards, tweets, comments and blog posts are all `\u003carticle\u003e` — the element is not reserved for long-form writing.
