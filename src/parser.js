const R = require('ramda')

const defaultOptions = require('./defaultOptions')

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
} = require('./glyps')

const GLYPH_TO_DIGIT_MAP = {
  [DIGIT_ZERO_GLYPH]: 0,
  [DIGIT_ONE_GLYPH]: 1,
  [DIGIT_TWO_GLYPH]: 2,
  [DIGIT_THREE_GLYPH]: 3,
  [DIGIT_FOUR_GLYPH]: 4,
  [DIGIT_FIVE_GLYPH]: 5,
  [DIGIT_SIX_GLYPH]: 6,
  [DIGIT_SEVEN_GLYPH]: 7,
  [DIGIT_EIGHT_GLYPH]: 8,
  [DIGIT_NINE_GLYPH]: 9
}

function createEntryParser (options = defaultOptions) {
  const { GLYPH_SIZE, GLYPHS_PER_ENTRY } = options

  const ENTRY_LINE_LENGTH = GLYPH_SIZE * GLYPHS_PER_ENTRY

  const getGlyphAtPosition = (entry, position) => {
    const line1 = entry.slice(0                    , ENTRY_LINE_LENGTH)
    const line2 = entry.slice(ENTRY_LINE_LENGTH    , ENTRY_LINE_LENGTH * 2)
    const line3 = entry.slice(ENTRY_LINE_LENGTH * 2, ENTRY_LINE_LENGTH * 3)
  
    const offset = position * GLYPH_SIZE
  
    return (
      line1.slice(offset, offset + GLYPH_SIZE) +
      line2.slice(offset, offset + GLYPH_SIZE) +
      line3.slice(offset, offset + GLYPH_SIZE)
    )
  }
  
  const parseDigitGlyph = glyph => {
    return GLYPH_TO_DIGIT_MAP[glyph] ?? null
  }

  const parseGlyphAtPosition = R.pipe(
    getGlyphAtPosition,
    parseDigitGlyph
  )

  const parse = (entry) => R
    .range(0, GLYPHS_PER_ENTRY)
    .map(
      R.partial(parseGlyphAtPosition, [entry])
    )

  return {
    parse,
  }
}

module.exports = {
  createEntryParser
}