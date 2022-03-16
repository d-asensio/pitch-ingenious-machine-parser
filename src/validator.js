const R = require('ramda')

const validator = (function createValidator () {
  const reverseDotProductReducer = (acc, digit, index) => {
    const multiplier = index + 1
    return acc + digit * multiplier
  }

  const calculateReverseDotProduct = digits => R
    .reverse(digits)
    .reduce(reverseDotProductReducer)

  const checksumMod = product => product % 11

  const validate = R.pipe(
    calculateReverseDotProduct,
    checksumMod,
    R.equals(0)
  )

  return {
    validate
  }
})()

module.exports = {
  validator
}
