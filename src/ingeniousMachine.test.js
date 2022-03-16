const { DOCUMENT_ENTRY_SEPARATOR } = require('./constants')
const { createIngeniousMachine } = require("./ingeniousMachine")

const ingeniousMachine = createIngeniousMachine()

describe('integration tests', () => {
  it ('should scan, parse and serialize a document containing a valid, illegible and invalid account numbers', () => {
    const document =
      "    _  _     _  _  _  _  _ " +
      "  | _| _||_||_ |_   ||_||_|" +
      "  ||_  _|  | _||_|  ||_| _|" +
      DOCUMENT_ENTRY_SEPARATOR +
      " _  _  _  _  _  _  _  _    " +
      "| || || || || || || ||_   |" +
      "|_||_||_||_||_||_||_| _|   " +
      DOCUMENT_ENTRY_SEPARATOR +
      " _  _  _  _  _  _  _  _    " +
      "| || || || || || || ||_   |" +
      "|_||_||_||_||_||_||_||_|  |" +
      DOCUMENT_ENTRY_SEPARATOR
  
    const result = ingeniousMachine.read(document)
    
    expect(result).toStrictEqual([
      '123456789',
      '00000005? ILL',
      '000000061 ERR'
    ])
  })
})
