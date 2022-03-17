const R = require('ramda')
const {
  GLYPH_TO_DIGIT_MAP,
  GLYPH_SIZE,
  GLYPHS_PER_ENTRY
} = require('./constants')

const parser = (function createEntryParser () {
  const ENTRY_LINE_LENGTH = GLYPH_SIZE * GLYPHS_PER_ENTRY

  const getGlyphAtPosition = (entry, position) => {
    const line1 = entry.slice(0, ENTRY_LINE_LENGTH)
    const line2 = entry.slice(ENTRY_LINE_LENGTH, ENTRY_LINE_LENGTH * 2)
    const line3 = entry.slice(ENTRY_LINE_LENGTH * 2, ENTRY_LINE_LENGTH * 3)

    const offset = position * GLYPH_SIZE

    return (
      line1.slice(offset, offset + GLYPH_SIZE) +
      line2.slice(offset, offset + GLYPH_SIZE) +
      line3.slice(offset, offset + GLYPH_SIZE)
    )
  }

  const parseDigitGlyph = R.partialRight(
    R.propOr(null),
    [GLYPH_TO_DIGIT_MAP]
  )

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
    parse
  }
})()

module.exports = {
  parser
}
