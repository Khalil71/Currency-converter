const axios = require('axios');
const { parseString } = require('xml2js');
const ConvertionModel = require('../../models/convert');

const { ecbURL, allowedFloats } = require('../../config/config');

class Convert {
  constructor(data) {
    this.from = data.from;
    this.to = data.to;
    this.amount = data.amount;
  }

  currencyData() {
    return axios
      .get(ecbURL)
      .then(
        response =>
          new Promise((resolve, reject) => {
            parseString(response.data, { trim: true }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                const currenciesInfo = result['gesmes:Envelope'].Cube[0].Cube[0].Cube;
                const fromCurrency = currenciesInfo.filter(obj => obj.$.currency === this.from)[0];
                const toCurrency = currenciesInfo.filter(obj => obj.$.currency === this.to)[0];
                const info = { fromCurrency, toCurrency };
                resolve(info);
              }
            });
          })
      )
      .catch(e => e);
  }

  convertion(info) {
    if (this.from === 'EUR') {
      const convertedAmount = this.amount * info.toCurrency.$.rate;
      return convertedAmount.toFixed(allowedFloats);
    } else if (this.to === 'EUR') {
      const convertedAmount = this.amount / info.fromCurrency.$.rate;
      return convertedAmount.toFixed(allowedFloats);
    }
    const convertedAmount = (this.amount / info.fromCurrency.$.rate) * info.toCurrency.$.rate;
    return convertedAmount.toFixed(allowedFloats);
  }

  addConvertionToDB(convertedAmount) {
    const transaction = new ConvertionModel({
      fromCurrency: this.from,
      toCurrency: this.to,
      amountBefore: this.amount,
      amountAfter: convertedAmount
    });
    return transaction
      .save()
      .then(() => ({
        fromCurrency: this.from,
        toCurrency: this.to,
        amountBefore: this.amount,
        amountAfter: convertedAmount
      }))
      .catch(e => e);
  }
}
module.exports = Convert;
