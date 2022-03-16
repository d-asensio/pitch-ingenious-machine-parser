const R = require('ramda');

const INVALID_DIGIT_PLACEHOLDER = '?'

const serializer = (function createSerializer() {
  const serializeDigit = R.when(
    R.isNil(),
    R.always(INVALID_DIGIT_PLACEHOLDER)
  )

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
