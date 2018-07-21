const Convertion = require('./Convert.Service');
const { errResponse } = require('../../helpers/errors');
const { currencyISO, number } = require('../../helpers/validation');

module.exports = {
  convertAmount: (req, res, next) => {
    if (!req.body.from || !currencyISO.test(req.body.from)) {
      return next(errResponse('Please enter a vaild ISO currency in the "from" section', 403));
    }
    if (!req.body.to || !currencyISO.test(req.body.to)) {
      return next(errResponse('Please enter a vaild ISO currency in the "to" section', 403));
    }
    if (!req.body.amount || !number.test(req.body.amount)) {
      return next(errResponse('Please enter a vaild number in the amount section', 403));
    }
    const instance = new Convertion({
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount
    });
    return instance
      .currencyData()
      .then(info => instance.convertion(info))
      .then(amount => instance.addConvertionToDB(amount))
      .then(result => res.status(200).send(result))
      .catch(() => next(errResponse('Cannot complete convertion', 403)));
  }
};
