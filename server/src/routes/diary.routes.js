const router = require('express').Router();
const diaryController = require('../controllers/diary.controller');
const { validateToken } = require('../middleware/validate');

// 저장/수정
router.post('/:date', validateToken, diaryController.createOrUpdateDiary);
router.put('/:date', validateToken, diaryController.createOrUpdateDiary);

// 조회/삭제
router.get('/:date', validateToken, diaryController.getDiaryByDate);
router.delete('/:date', validateToken, diaryController.deleteDiary);

module.exports = router;
