const weatherService = require('../services/weather.service');

exports.getNow = async (req, res, next) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ message: 'lat, lon are required' });

        const data = await weatherService.fetchNow({ lat: Number(lat), lon: Number(lon) });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.getByDate = async (req, res, next) => {
    try {
        const { date, lat, lon } = req.query;
        if (!date || !lat || !lon) return res.status(400).json({ message: 'date, lat, lon are required' });

        const data = await weatherService.fetchByDate({ date, lat: Number(lat), lon: Number(lon) });
        res.json(data);
    } catch (err) {
        next(err);
    }
};
