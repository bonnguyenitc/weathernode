var express = require('express');
var router = express.Router();
var request = require('request');
var helpers = require('../helpers/index');

/**
 * get index
 */
router.get('/', (req, res, next) => {
    res.render('index', { 'weather' : null, 'error' : null});
})
/**
 * get weather
 */
router.get('/weather', (req, res, next) => {
    let { txtcity, txtdate } = req.query;
    request(helpers.options(helpers.change_alias(txtcity)), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let weather = JSON.parse(body);
            let weatherToday = weather.data.find((item)=> item.datetime == txtdate);
            // return res.send(weatherToday);
            if(weatherToday)
                return res.render('index', { 'weather' : weatherToday, 'city': weather.city_name, 'error' : null, 'date': txtdate, 'country':weather.country_code });
            else 
                return res.render('index', { 'error': 'Không tìm thấy dữ liệu', 'weather': null });
        }
        return res.render('index', { 'error': 'Không tìm thấy dữ liệu', 'weather': null });
    });
});


module.exports = router;