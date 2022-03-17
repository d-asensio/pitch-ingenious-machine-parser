const defaultFs = require('fs')
const { createMachineDocumentReader } = require('./machineDocumentReader')

function createCLI (dependencies = {}) {
  const {
    fs = defaultFs,
    machineDocumentReader = createMachineDocumentReader()
  } = dependencies

  const run = ([,, inputFilePath, outputFilePath]) => {
    const document = fs.readFileSync(inputFilePath).toString()

    const parsedAccountNumbers = machineDocumentReader.read(document)

    fs.writeFileSync(outputFilePath, parsedAccountNumbers.join('\n'))
  }

  return {
    run
  }
}

module.exports = {
  createCLI
}
