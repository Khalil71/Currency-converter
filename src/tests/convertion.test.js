const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('./mockServer.js');
const Convert = require('../APIs/Convert/Convert.Service');
const ConvertionModel = require('../models/convert');

const { dbURL } = require('../config/config');

describe('Currency convertion tests', () => {
  before(done => {
    mongoose.connect(dbURL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => {
      console.log('Connected to Convertion database!'); // eslint-disable-line
      done();
    });
  });

  before(done => {
    mongoose.connection.db.dropCollection('convertions', () => {
      console.log('convertions collection dropped'); // eslint-disable-line
      done();
    });
  });

  before(() => {
    server.listen(9999);
  });

  it('should get Euro foreign exchange reference rates and extract info for the requested currencies', done => {
    const data = { from: 'USD', to: 'JPY' };
    const instance = new Convert(data);
    const transaction = instance.currencyData();
    transaction.then(result => {
      expect(result.fromCurrency.$.currency).to.equal(data.from);
      expect(result.toCurrency.$.currency).to.equal(data.to);
      done();
    });
  });

  it('should convert the amount from the old currency to the new', () => {
    const data = { from: 'USD', to: 'JPY', amount: 5 };
    const instance = new Convert(data);
    const transaction = instance.convertion({
      fromCurrency: { $: { currency: 'USD', rate: '1.1670' } },
      toCurrency: { $: { currency: 'JPY', rate: '130.94' } }
    });
    expect(Number(transaction)).to.equal(561.01);
  });

  it('should create 1 transaction in the DB', done => {
    const data = { from: 'USD', to: 'JPY', amount: 5 };
    const convertedAmount = 561.01;
    const instance = new Convert(data);
    const transaction = instance.addConvertionToDB(convertedAmount);
    transaction.then(result => {
      expect(result.fromCurrency).to.equal(data.from);
      expect(result.toCurrency).to.equal(data.to);
      expect(result.amountBefore).to.equal(data.amount);
      expect(result.amountAfter).to.equal(convertedAmount);
      done();
    });
  });

  it('should create 1 transaction in the DB', done => {
    const data = { from: 'EUR', to: 'USD', amount: 5 };
    const convertedAmount = 5.83;
    const instance = new Convert(data);
    const transaction = instance.addConvertionToDB(convertedAmount);
    transaction.then(result => {
      expect(result.fromCurrency).to.equal(data.from);
      expect(result.toCurrency).to.equal(data.to);
      expect(result.amountBefore).to.equal(data.amount);
      expect(result.amountAfter).to.equal(convertedAmount);
      done();
    });
  });

  it('should count the transactions made', done => {
    ConvertionModel.find({}).then(result => {
      expect(result.length).to.equal(2);
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('convertions', () => {
      console.log('convertions collection dropped'); // eslint-disable-line
      done();
    });
  });

  after(() => {
    server.close();
  });
});
