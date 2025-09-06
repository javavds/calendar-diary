const diaryRepo = require('../repositories/diary.repo');

exports.createOrUpdateDiary = async (userId, date, data) => {
    return await diaryRepo.upsertDiary(userId, date, data);
};

exports.getDiaryByDate = async (userId, date) => {
    return await diaryRepo.findDiary(userId, date);
};

exports.deleteDiary = async (userId, date) => {
    return await diaryRepo.deleteDiary(userId, date);
};
