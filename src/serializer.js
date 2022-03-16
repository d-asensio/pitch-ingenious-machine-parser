const R = require('ramda');

const INVALID_DIGIT_PLACEHOLDER = '?'

const serializer = (function createSerializer() {
  const serializeDigit = digit =>
    digit !== null
      ? digit
      : INVALID_DIGIT_PLACEHOLDER

  const serialize = R.pipe(
    R.map(serializeDigit),
    R.join('')
  )

  return {
    serialize
  }
})()

module.exports = {
  serializer
}
