import test from 'ava'
import cryptoValidator from '../../lib/coins/validators'
import {parseUrl as parseBTCAddress, base58Opts as BTCBase58Opts} from '../../lib/coins/btc'
import {base58Opts as LTCBase58Opts} from '../../lib/coins/ltc'
import {base58Opts as DASHBase58Opts} from '../../lib/coins/dash'
import {base58Opts as ZECBase58Opts} from '../../lib/coins/zec'

test('Should validate BTC P2PKH', t => {
  t.plan(2)
  const mainNetaddr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  const testNetaddr = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, BTCBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, BTCBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate BTC P2SH', t => {
  t.plan(2)
  const mainNetaddr = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
  const testNetaddr = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, BTCBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, BTCBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate LTC P2PKH', t => {
  t.plan(2)
  const mainNetaddr = 'LVdPgVLae4mTeAdywWqmwWkJypAGcRkHy3'
  const testNetaddr = 'mhLpXMH9EGV7xFRg5gjKXFpoxaer7ehEeW'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, LTCBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, LTCBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate LTC P2SH', t => {
  t.plan(2)
  const mainNetaddr = '35tx7n3XhCc1TJorddFzixgAU1nUVCUMxm'
  const testNetaddr = '2NBsZNqVDUKtchDSnTJT72tUgbtLGqpkfVe'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, LTCBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, LTCBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate DASH P2PKH', t => {
  t.plan(2)
  const mainNetaddr = 'XuvPuKz7JPkyzWn8g7PNLjYVNdouedLc56'
  const testNetaddr = 'yh1csSCnZNRLqBgzHFUMVTHaW4TU74K28R'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, DASHBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, DASHBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate DASH P2SH', t => {
  t.plan(2)
  const mainNetaddr = '7Z5BvydGVzgbX9xqWEb1JtF9TkToG8htcV'
  const testNetaddr = '8ik6MdU1RprCq6YtTsHNkg8biMxZUyXo8q'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, DASHBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, DASHBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate ZEC P2PKH', t => {
  const mainNetaddr = 't1ZYZS6ynUDbvht7vH3dMiM3rsAJ1p6EGWC'
  const testNetaddr = 'tmKBPqa8qqKA7vrGq1AaXHSAr9vqa3GczzK'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, ZECBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, ZECBase58Opts)
  t.true(validatedMain)
  t.true(validatedTest)
})

test('Should validate ZEC P2SH', t => {
  t.plan(2)
  const mainNetaddr = 't3f3T3nCWsEpzmD35VK62JgQfFig74dV8C9'
  const testNetaddr = 't295qeRQc3xhzgf7HQYLh3du7uWyrLmtQf6'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, ZECBase58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, ZECBase58Opts)
  t.true(validatedTest)
  t.true(validatedMain)
})

test('Should validate BTC bech32', t => {
  t.plan(2)
  const mainNetaddr = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
  const testNetaddr = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
  const validatedMain = parseBTCAddress('main', mainNetaddr)
  const validatedTest = parseBTCAddress('test', testNetaddr)
  t.is(validatedMain, mainNetaddr)
  t.is(validatedTest, testNetaddr)
})

test('Should fail length validation', t => {
  const addr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  const opts = BTCBase58Opts
  opts.bufferLength = 10
  const validated = cryptoValidator.base58Validator('main', addr, opts)
  t.false(validated)
})

test('Should throw exception on invalid address', t => {
  const addr = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNL0'
  const validated = cryptoValidator.base58Validator('main', addr, BTCBase58Opts)
  t.false(validated)
})