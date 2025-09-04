const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diary.controller');
const validate = require('../middleware/validate'); // 입력값 검증
const Joi = require('joi');

// 요청 body 검증 스키마
const diarySchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().required(),
  mood: Joi.string().valid('good', 'soso', 'bad').optional()
});

// GET: 특정 날짜 일기 조회
router.get('/:date', diaryController.getByDate);

// POST: 특정 날짜 일기 저장 (검증 추가)
router.post('/:date', validate(diarySchema, 'body'), diaryController.save);

module.exports = router;
