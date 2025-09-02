const diaryRepo = require('../repositories/diary.repo');

// 특정 날짜 일기 조회
exports.getDiaryByDate = async (userId, date) => {
    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new Error('올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)');
    }

    const diary = await diaryRepo.findByDate(userId, date);
    return diary;
};

// 일기 저장 (새로 생성하거나 수정)
exports.saveDiary = async (userId, date, title, content, mood = null) => {
    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new Error('올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)');
    }

    // 제목과 내용 검증
    if (!title || title.trim() === '') {
        throw new Error('제목은 필수입니다');
    }
    if (!content || content.trim() === '') {
        throw new Error('내용은 필수입니다');
    }

    // 제목 길이 제한
    if (title.length > 200) {
        throw new Error('제목은 200자를 초과할 수 없습니다');
    }

    const result = await diaryRepo.saveDiary(userId, date, title.trim(), content.trim(), mood);
    return result;
};
