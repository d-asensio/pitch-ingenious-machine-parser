const R = require('ramda')

const { validator: defaultValidator } = require('./validator')

const {
  VALID_NUMBER_STATUS,
  INVALID_NUMBER_STATUS,
  ILLEGIBLE_NUMBER_STATUS
} = require('./constants')

function createStatusResolver (dependencies = {}) {
  const {
    validator = defaultValidator
  } = dependencies

  const isIllegibleAccountNumber = R.includes(null)

  const isInvalidAccountNumber = R.complement(validator.validate)

  const resolveIllegibleStatus = R.ifElse(
    isIllegibleAccountNumber,
    R.always(ILLEGIBLE_NUMBER_STATUS),
    R.always(false)
  )

  const resolveInvalidStatus = R.ifElse(
    isInvalidAccountNumber,
    R.always(INVALID_NUMBER_STATUS),
    R.always(false)
  )

  const resolve = R.either(
    R.either(
      resolveIllegibleStatus,
      resolveInvalidStatus
    ),
    R.always(VALID_NUMBER_STATUS)
  )

  return {
    resolve
  }
}

module.exports = {
  createStatusResolver
}
