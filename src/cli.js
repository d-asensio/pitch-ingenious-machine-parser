const defaultFs = require('fs')
const { createIngeniousMachine } = require('./ingeniousMachine')

function createCLI (dependencies = {}) {
  const {
    fs = defaultFs,
    ingeniousMachine = createIngeniousMachine()
  } = dependencies

  const run = ([,, inputFilePath, outputFilePath]) => {
    const document = fs.readFileSync(inputFilePath).toString()
    
    const parsedAccountNumbers = ingeniousMachine.read(document)

    fs.writeFileSync(outputFilePath, parsedAccountNumbers.join('\n'))
  }

  return {
    run
  }
}

module.exports = {
  createCLI
}
