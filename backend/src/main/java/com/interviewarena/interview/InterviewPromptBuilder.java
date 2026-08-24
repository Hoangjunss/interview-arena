package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InterviewPromptBuilder {

    private final int totalQuestions;

    public InterviewPromptBuilder(@Value("${app.interview.total-questions:5}") int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    private String systemPrompt(InterviewSession session) {
        return """
            Bạn đóng vai một Interviewer thật đang phỏng vấn ứng viên vị trí
            %s - %s, cấp độ %s.

            Quy tắc:
            1. Hỏi từng câu một, không hỏi dồn nhiều câu cùng lúc.
            2. Câu hỏi tiếp theo PHẢI bám vào nội dung câu trả lời trước đó của ứng viên.
            3. Giữ giọng điệu chuyên nghiệp, khích lệ, không gay gắt.
            4. Sau đúng %d câu, dừng hỏi và chuyển sang chế độ chấm điểm.
            5. Luôn trả lời bằng tiếng Việt trừ khi ứng viên chủ động trả lời bằng tiếng Anh.

            Chỉ trả về NỘI DUNG CÂU HỎI tiếp theo, không thêm lời dẫn khác.
            """.formatted(session.getPosition(), session.getTechnology(), session.getLevel(), totalQuestions);
    }

    public List<LlmMessage> buildQuestionPrompt(InterviewSession session, List<InterviewTurn> history) {
        List<LlmMessage> messages = new ArrayList<>();
        messages.add(new LlmMessage("system", systemPrompt(session)));
        for (InterviewTurn turn : history) {
            messages.add(new LlmMessage("assistant", turn.getQuestionText()));
            if (turn.getAnswerText() != null) {
                messages.add(new LlmMessage("user", turn.getAnswerText()));
            }
        }
        return messages;
    }

    public List<LlmMessage> buildScoringPrompt(InterviewSession session, List<InterviewTurn> history) {
        List<LlmMessage> messages = buildQuestionPrompt(session, history);
        messages.add(new LlmMessage("system", """
            Phiên phỏng vấn đã kết thúc. Hãy chấm điểm toàn bộ phần trả lời của ứng viên. Đánh giá theo 3 tiêu chí: độ chính xác kỹ thuật, cách trình bày/cấu trúc câu trả lời, mức độ tự tin trong ngôn từ.

            Trả về DUY NHẤT một chuỗi JSON hợp lệ, không kèm lời dẫn, không kèm markdown code fence, đúng đúng định dạng sau:
            {"finalScore": <0-100>, "turnFeedback": [{"turnOrder": <int>, "feedback": "<string>"}]}
            """));
        return messages;
    }

    public int totalQuestions() {
        return totalQuestions;
    }
}
