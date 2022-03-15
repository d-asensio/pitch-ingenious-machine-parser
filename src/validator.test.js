const validator = require("./validator")

it.each([
  [
    [3, 4, 5, 8, 8, 2, 8, 6, 5]
  ],
  [
    [4, 5, 7, 5, 0, 8, 0, 0, 0]
  ]
])('should take "%j" as valid', (digits) => {
  expect(validator.validate(digits)).toBe(true)
})

it.each([
  [
    [6, 6, 4, 3, 7, 1, 4, 9, 5]
  ]
])('should take "%j" as invalid', (digits) => {
  expect(validator.validate(digits)).toBe(false)
})
