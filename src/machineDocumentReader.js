const R = require('ramda')

const { createScanner } = require('./scanner')
const { createStatusResolver } = require('./statusResolver')
const { serializer: defaultSerializer } = require('./serializer')

function createMachineDocumentReader (dependencies = {}) {
  const {
    scanner = createScanner(),
    statusResolver = createStatusResolver(),
    serializer = defaultSerializer
  } = dependencies

  const assingStatusToOneAccountNumber = accountNumber => [
    accountNumber,
    statusResolver.resolve(accountNumber)
  ]

  const assingStatusToAccountNumbers = R.map(assingStatusToOneAccountNumber)

  const read = R.pipe(
    scanner.scan,
    assingStatusToAccountNumbers,
    serializer.serialize
  )

  return {
    read
  }
}

module.exports = {
  createMachineDocumentReader
}
