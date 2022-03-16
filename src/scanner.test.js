const { when } = require('jest-when')

const { DOCUMENT_ENTRY_SEPARATOR } = require('./constants')
const { createScanner } = require('./scanner')

const parser = {
  parse: jest.fn()
}

const scanner = createScanner({ parser })

it('should scan a document and use the parser to retrieve its entries', () => {
  const anEntry =
    ' _  _  _  _  _  _  _  _  _ ' +
    '| || || || || || || || || |' +
    '|_||_||_||_||_||_||_||_||_|'
  const anotherEntry =
    '                           ' +
    '  |  |  |  |  |  |  |  |  |' +
    '  |  |  |  |  |  |  |  |  |'
  when(parser.parse)
    .calledWith(anEntry)
    .mockReturnValue([0, 0, 0, 0, 0, 0, 0, 0, 0])
  when(parser.parse)
    .calledWith(anotherEntry)
    .mockReturnValue([1, 1, 1, 1, 1, 1, 1, 1, 1])

  const result = scanner.scan(
    anEntry +
    DOCUMENT_ENTRY_SEPARATOR +
    anotherEntry +
    DOCUMENT_ENTRY_SEPARATOR
  )

  expect(result).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ])
})

it('should remove entry line breaks before parsing them', () => {
  const anEntryWithLineBreaks =
    ' _  _  _  _  _  _  _  _  _ \n' +
    '| || || || || || || || || |\n' +
    '|_||_||_||_||_||_||_||_||_|\n'

  scanner.scan(
    anEntryWithLineBreaks +
    DOCUMENT_ENTRY_SEPARATOR
  )

  expect(parser.parse).toHaveBeenCalledWith(
    ' _  _  _  _  _  _  _  _  _ ' +
    '| || || || || || || || || |' +
    '|_||_||_||_||_||_||_||_||_|'
  )
})
