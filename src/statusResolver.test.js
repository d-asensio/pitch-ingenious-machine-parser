const { when } = require('jest-when')
const {
  VALID_NUMBER_STATUS,
  INVALID_NUMBER_STATUS,
  ILLEGIBLE_NUMBER_STATUS
} = require('./constants')

const { createStatusResolver } = require('./statusResolver')

const validator = {
  validate: jest.fn()
}

const statusResolver = createStatusResolver({ validator })

it('should resolve the status to "ILLEGIBLE_NUMBER_STATUS" for an illegible account number', () => {
  const accountNumber = [1, 2, null, 4, 5, null, 7, 8, null]

  const result = statusResolver.resolve(accountNumber)

  expect(result).toBe(ILLEGIBLE_NUMBER_STATUS)
})

it('should resolve the status to "INVALID_NUMBER_STATUS" when it is unable to validate the account number using the validator', () => {
  const accountNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  when(validator.validate)
    .calledWith(accountNumber)
    .mockReturnValue(false)

  const result = statusResolver.resolve(accountNumber)

  expect(result).toBe(INVALID_NUMBER_STATUS)
})

it('should resolve the status to "VALID_NUMBER_STATUS" when the validator takes the account number as valid', () => {
  const accountNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  when(validator.validate)
    .calledWith(accountNumber)
    .mockReturnValue(true)

  const result = statusResolver.resolve(accountNumber)

  expect(result).toBe(VALID_NUMBER_STATUS)
})
