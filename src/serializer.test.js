const { serializer } = require("./serializer")

const {
  VALID_NUMBER_STATUS,
  INVALID_NUMBER_STATUS,
  ILLEGIBLE_NUMBER_STATUS
} = require('./constants');

it('should serialize pairs of account numbers with status', () => {
  const accountNumbersWithStatus = [
    [[1, 2, 3, 4, 5, 6, 7, 8, 9],       VALID_NUMBER_STATUS],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1],       INVALID_NUMBER_STATUS],
    [[1, null, 5, 1, 3, null, 1, 4, 6], ILLEGIBLE_NUMBER_STATUS]
  ]

  const result = serializer.serialize(accountNumbersWithStatus)

  expect(result).toStrictEqual([
    '123456789',
    '111111111 ERR',
    '1?513?146 ILL'
  ])
})
