// src/middlewares/error.js

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    console.error(err);
  
    // 기본 응답
    let status = 500;
    let message = '서버 내부 오류가 발생했습니다';
  
    // 서비스/검증 단계에서 던진 에러를 처리
    if (err.name === 'ValidationError') {
      status = 400;
      message = err.message || '요청 값이 올바르지 않습니다';
    } else if (err.name === 'UnauthorizedError') {
      status = 401;
      message = '인증이 필요합니다';
    } else if (err.code === 'ER_DUP_ENTRY') {
      // MySQL 중복 키 에러 예시
      status = 409;
      message = '이미 존재하는 데이터입니다';
    } else if (err.message) {
      // 커스텀 Error 객체일 경우
      message = err.message;
      if (err.status) status = err.status;
    }
  
    res.status(status).json({
      success: false,
      message,
    });
  };
  