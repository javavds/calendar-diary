const diaryService = require('../services/diary.service');

exports.createOrUpdateDiary = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { date } = req.params;
        const { title, content, mood } = req.body;

        const diary = await diaryService.createOrUpdateDiary(userId, date, { title, content, mood });
        res.json(diary);
    } catch (err) {
        next(err);
    }
};

exports.getDiaryByDate = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { date } = req.params;

        const diary = await diaryService.getDiaryByDate(userId, date);
        if (!diary) return res.status(404).json({ message: 'No diary found' });
        res.json(diary);
    } catch (err) {
        next(err);
    }
};

exports.deleteDiary = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { date } = req.params;
        await diaryService.deleteDiary(userId, date);
        res.json({ message: 'Diary deleted' });
    } catch (err) {
        next(err);
    }
};
