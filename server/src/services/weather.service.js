const axios = require('axios');

const codeToKo = (code) => {
    const map = { 0: '맑음', 1: '대체로 맑음', 2: '부분적 구름', 3: '흐림' };
    return map[code] ?? `코드 ${code}`;
};

exports.fetchNow = async ({ lat, lon }) => {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const { data } = await axios.get(url, {
        params: { latitude: lat, longitude: lon, current_weather: true, timezone: 'Asia/Seoul' },
    });
    const c = data?.current_weather || {};
    return { summary: codeToKo(c.weathercode), tempC: c.temperature, time: c.time };
};

exports.fetchByDate = async ({ date, lat, lon }) => {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const { data } = await axios.get(url, {
        params: {
            latitude: lat,
            longitude: lon,
            daily: 'weathercode,temperature_2m_max,temperature_2m_min',
            start_date: date,
            end_date: date,
            timezone: 'Asia/Seoul',
        },
    });
    return {
        date: data.daily.time[0],
        summary: codeToKo(data.daily.weathercode[0]),
        tMaxC: data.daily.temperature_2m_max[0],
        tMinC: data.daily.temperature_2m_min[0],
    };
};
