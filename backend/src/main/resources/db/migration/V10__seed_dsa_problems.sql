-- V10__seed_dsa_problems.sql
INSERT INTO dsa_problems (slug, topic, difficulty, status, content_path, synced_at)
VALUES
    ('two-sum', 'array', 'easy', 'ACTIVE', 'content/dsa/two-sum', NOW())
ON CONFLICT (slug) DO UPDATE
SET topic = EXCLUDED.topic,
    difficulty = EXCLUDED.difficulty,
    status = EXCLUDED.status,
    content_path = EXCLUDED.content_path,
    synced_at = EXCLUDED.synced_at;

INSERT INTO dsa_problems (slug, topic, difficulty, status, content_path, synced_at)
VALUES
    ('valid-parentheses', 'string', 'easy', 'ACTIVE', 'content/dsa/valid-parentheses', NOW())
ON CONFLICT (slug) DO UPDATE
SET topic = EXCLUDED.topic,
    difficulty = EXCLUDED.difficulty,
    status = EXCLUDED.status,
    content_path = EXCLUDED.content_path,
    synced_at = EXCLUDED.synced_at;

INSERT INTO dsa_problems (slug, topic, difficulty, status, content_path, synced_at)
VALUES
    ('binary-search', 'sorting-searching', 'easy', 'ACTIVE', 'content/dsa/binary-search', NOW())
ON CONFLICT (slug) DO UPDATE
SET topic = EXCLUDED.topic,
    difficulty = EXCLUDED.difficulty,
    status = EXCLUDED.status,
    content_path = EXCLUDED.content_path,
    synced_at = EXCLUDED.synced_at;

INSERT INTO dsa_problems (slug, topic, difficulty, status, content_path, synced_at)
VALUES
    ('fibonacci-number', 'dynamic-programming', 'easy', 'ACTIVE', 'content/dsa/fibonacci-number', NOW())
ON CONFLICT (slug) DO UPDATE
SET topic = EXCLUDED.topic,
    difficulty = EXCLUDED.difficulty,
    status = EXCLUDED.status,
    content_path = EXCLUDED.content_path,
    synced_at = EXCLUDED.synced_at;
