---
id: base-model-va-instruct-chat-model-khac-nhau-the-nao
position: backend
technology: llm-fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Base model và Instruct/Chat model khác nhau thế nào?

## Question (EN)
How do base models differ from instruct/chat models?

## Đáp án chi tiết (VI)
**Base model** (còn gọi pretrained / foundation model) chỉ được train mục tiêu **dự đoán token tiếp theo** trên corpus lớn. Nó \\"biết\\" ngôn ngữ và kiến thức nhưng chỉ **hoàn thành văn bản** — đưa vào một câu hỏi, nó có thể tiếp tục sinh thêm câu hỏi tương tự thay vì trả lời, vì đó là thứ hay xuất hiện trong dữ liệu.\
\
**Instruct / Chat model** là base model được **hậu-huấn luyện (post-training)** để tuân theo chỉ dẫn và hội thoại. Quy trình điển hình: **SFT** (Supervised Fine-Tuning trên cặp instruction→response do người viết) rồi **alignment** bằng **RLHF** hoặc **DPO** theo sở thích con người. Kết quả (như InstructGPT): model nhỏ hơn nhưng bám ý người dùng tốt hơn, ít độc hại hơn.\
\
**Chọn cái nào**: hầu hết ứng dụng dùng **instruct/chat** (gpt-4o, Claude, Llama-Instruct). **Base model** chỉ hợp khi bạn tự fine-tune từ đầu hoặc cần hành vi hoàn-thành-văn-bản thuần. Lưu ý: instruct model cần đúng **chat template** và **system prompt**; base model thì không.

## Detailed Answer (EN)
A **base model** (a.k.a. pretrained / foundation model) is trained only for **next-token prediction** over a large corpus. It \\"knows\\" language and facts but only **completes text** — given a question, it may keep generating similar questions instead of answering, because that is what appears in the data.\
\
An **instruct / chat model** is a base model **post-trained** to follow instructions and converse. Typical pipeline: **SFT** (Supervised Fine-Tuning on human-written instruction→response pairs) then **alignment** via **RLHF** or **DPO** on human preferences. The result (as in InstructGPT): a smaller model that follows user intent better and is less toxic.\
\
**Which to use**: most apps use **instruct/chat** models (gpt-4o, Claude, Llama-Instruct). A **base model** only fits when you fine-tune from scratch or need pure text-completion behavior. Note: instruct models need the correct **chat template** and **system prompt**; base models do not.
