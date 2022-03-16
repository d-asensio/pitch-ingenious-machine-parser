const { when } = require("jest-when")

const { createCLI } = require('./cli')

const fs = {
  readFileSync: jest.fn(),
  writeFileSync: jest.fn()
}

const ingeniousMachine = {
  read: jest.fn()
}

const cli = createCLI({ fs, ingeniousMachine })

it('should read the given input file, provide its content to the machine and write its output to the given output file', () => {
  const inputFilePath = '/a/path/to/input.txt'
  const inputFileContent = 'any-content'
  const machineOutput = [
    'a-line',
    'another-line',
    'a-third-line'
  ]
  const outputFilePath = '/a/path/to/output.txt'
  const outputFileContent =
    'a-line\n' +
    'another-line\n' +
    'a-third-line'
  when(fs.readFileSync)
    .calledWith(inputFilePath)
    .mockReturnValue(
      Buffer.from(inputFileContent)
    )
  when(ingeniousMachine.read)
    .calledWith(inputFileContent)
    .mockReturnValue(machineOutput)

  cli.run(['', '', inputFilePath, outputFilePath])
  
  expect(fs.writeFileSync).toHaveBeenCalledWith(outputFilePath, outputFileContent)
})