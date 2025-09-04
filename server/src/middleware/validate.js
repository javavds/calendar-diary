// src/middlewares/validate.js
const Joi = require('joi');

/**
 * schema: Joi 객체
 * property: req에서 검사할 위치 (body, params, query)
 */
module.exports = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,   // 모든 에러를 수집
      allowUnknown: false, // 정의되지 않은 값 허용X
      stripUnknown: true   // 불필요한 값 제거
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: '입력값 검증 실패',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }

    // 검증 통과한 깨끗한 데이터만 컨트롤러에 전달
    req[property] = value;
    next();
  };
};
