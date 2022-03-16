const { serializer } = require("./serializer")

it('should serialize a legible accountNumber', () => {
  const accountNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const result = serializer.serialize(accountNumber)

  expect(result).toBe('123456789')
})

it('should serialize a legible accountNumber containing zeros', () => {
  const accountNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const result = serializer.serialize(accountNumber)

  expect(result).toBe('000000000')
})

it('should serialize a illegible accountNumber', () => {
  const accountNumber = [1, 2, null, 4, 5, null, 7, 8, null]

  const result = serializer.serialize(accountNumber)

  expect(result).toBe('12?45?78?')
})
