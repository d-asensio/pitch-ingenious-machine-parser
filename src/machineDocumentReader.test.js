const { DOCUMENT_ENTRY_SEPARATOR } = require('./constants')
const { createMachineDocumentReader } = require('./machineDocumentReader')

const machineDocumentReader = createMachineDocumentReader()

describe('integration tests', () => {
  it('should scan, parse and serialize a document containing a valid, illegible and invalid account numbers', () => {
    const document =
      '    _  _     _  _  _  _  _ ' +
      '  | _| _||_||_ |_   ||_||_|' +
      '  ||_  _|  | _||_|  ||_| _|' +
      DOCUMENT_ENTRY_SEPARATOR +
      ' _  _  _  _  _  _  _  _    ' +
      '| || || || || || || ||_   |' +
      '|_||_||_||_||_||_||_| _|   ' +
      DOCUMENT_ENTRY_SEPARATOR +
      ' _  _  _  _  _  _  _  _    ' +
      '| || || || || || || ||_   |' +
      '|_||_||_||_||_||_||_||_|  |' +
      DOCUMENT_ENTRY_SEPARATOR

    const result = machineDocumentReader.read(document)

    expect(result).toStrictEqual([
      '123456789',
      '00000005? ILL',
      '000000061 ERR'
    ])
  })
})
