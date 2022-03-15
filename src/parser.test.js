const {
  DIGIT_ZERO_GLYPH,
  DIGIT_ONE_GLYPH,
  DIGIT_TWO_GLYPH,
  DIGIT_THREE_GLYPH,
  DIGIT_FOUR_GLYPH,
  DIGIT_FIVE_GLYPH,
  DIGIT_SIX_GLYPH,
  DIGIT_SEVEN_GLYPH,
  DIGIT_EIGHT_GLYPH,
  DIGIT_NINE_GLYPH
} = require('./constants')

const { parseDigitGlyph } = require('./parser')

describe('parseDigitGlyph', () => {
  it.each([
    [0, DIGIT_ZERO_GLYPH],
    [1, DIGIT_ONE_GLYPH],
    [2, DIGIT_TWO_GLYPH],
    [3, DIGIT_THREE_GLYPH],
    [4, DIGIT_FOUR_GLYPH],
    [5, DIGIT_FIVE_GLYPH],
    [6, DIGIT_SIX_GLYPH],
    [7, DIGIT_SEVEN_GLYPH],
    [8, DIGIT_EIGHT_GLYPH],
    [9, DIGIT_NINE_GLYPH],
  ])('should parse the glyph representing the digit "%s"', (digit, glyph) => {
    expect(
      parseDigitGlyph(glyph)
    ).toBe(digit)
  })

  it('should return "null" in case the glyph does not represent any known digit', () => {
    const unknownDigitGlyph =
      ' _ ' +
      '  |' +
      ' _|'

      expect(
        parseDigitGlyph(unknownDigitGlyph)
      ).toBe(null)
  })
})
