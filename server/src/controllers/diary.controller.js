const diaryService = require('../services/diary.service');

exports.getByDate = async (req, res, next) => {
  try {
    const userId = 1;
    const { date } = req.params;
    const diary = await diaryService.getDiaryByDate(userId, date);
    return res.json(diary);
  } catch (e) {
    next ? next(e) : res.status(400).json({ message: e.message });
  }
};

exports.save = async (req, res, next) => {
  try {
    const userId = 1;
    const { date } = req.params;
    const { title, content, mood } = req.body ?? {};
    const saved = await diaryService.saveDiary(userId, date, title, content, mood);
    return res.json(saved);
  } catch (e) {
    next ? next(e) : res.status(400).json({ message: e.message });
  }
};