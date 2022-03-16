const R = require('ramda')

const {
  VALID_NUMBER_STATUS,
  INVALID_NUMBER_STATUS,
  ILLEGIBLE_NUMBER_STATUS
} = require('./constants')

const INVALID_DIGIT_PLACEHOLDER = '?'

const STATUS_TO_STRING_MAP = {
  [VALID_NUMBER_STATUS]: '',
  [INVALID_NUMBER_STATUS]: ' ERR',
  [ILLEGIBLE_NUMBER_STATUS]: ' ILL'
}

const serializer = (function createSerializer () {
  const serializeOneDigit = R.when(
    R.isNil(),
    R.always(INVALID_DIGIT_PLACEHOLDER)
  )

  const serializeDigits = R.pipe(
    R.map(serializeOneDigit),
    R.join('')
  )

  const serializeStatus = R.partialRight(
    R.prop,
    [STATUS_TO_STRING_MAP]
  )

  const serializeOne = ([accountNumber, status]) =>
    R.concat(
      serializeDigits(accountNumber),
      serializeStatus(status)
    )

  const serialize = R.map(serializeOne)

  return {
    serialize
  }
})()

module.exports = {
  serializer
}
