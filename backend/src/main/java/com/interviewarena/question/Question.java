package com.interviewarena.question;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private String source;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus status;

    @Column(name = "content_path", nullable = false)
    private String contentPath;

    @Column(name = "synced_at", nullable = false)
    private Instant syncedAt;

    public UUID getId() { return id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public QuestionStatus getStatus() { return status; }
    public void setStatus(QuestionStatus status) { this.status = status; }
    public String getContentPath() { return contentPath; }
    public void setContentPath(String contentPath) { this.contentPath = contentPath; }
    public Instant getSyncedAt() { return syncedAt; }
    public void setSyncedAt(Instant syncedAt) { this.syncedAt = syncedAt; }
}
