# Pitch Coding Challenge - Ingenious Machine

This document attempts to explain the big picture of the code and the architecture it follows and also gives insight into the intentions behind it.

Thank you for taking the time to read and review!

## Before starting

I decided to use JavaScript to complete this challenge because is a language that I am proficient with and it is also widely known.

Additionally, I used a functional programming style to get as close as possible to Clojure, so it is more familiar to you.

## Set up the project

To initialize this project you need the following tools:

 - **node v16.5.0**
 - **yarn v1.22.17**

It should work with other node versions, and even using `npm` instead of `yarn`. However, is good to mention the specific versions just to get sure that we get the same results.

Before running the code, the dependencies have to be installed. You can do that by running the following command:

```bash
yarn
```

## Dependencies

The only dependency that is used in the production code of this project is [ramda](https://ramdajs.com/).

From the Ramda official website:

> Ramda emphasizes a purer functional style. Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.

I decided to use it because I know that functional programming is the paradigm of preference at Pitch.

It could have been done with pure vanilla JavaScript, but Ramda auto-curried functions are easy to compose and ensure immutability, which translates into more robust and readable code.

**Development dependencies**

I also used some development dependencies, mainly for testing and linting:

- [Jest](https://jestjs.io/): Test runner
- [jest-when](https://github.com/timkindberg/jest-when#readme): Useful to create stubs in Jest. Jest provides a way to do that but is not as readable and ergonomic, which are characteristics I value when it comes to writing (and reading) tests.
- [Striker Mutator](https://stryker-mutator.io/): A tool for doing [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing). I will explain why I used this later.
- [Standard](https://standardjs.com/): A zero-configuration linter. Code formatting is important since it contributes to better readability but I don't like to deal with linting issues while programming. I prefer to focus on the problem, this is why I use a linter that I don't have to configure and it fixes most of the things automatically for me.

## Run the code

To easily run the code, I prepared a couple of `yarn` scripts:

- `demo:suggested-test-cases`: Runs the code against the suggested test case, the one that is provided in the challenge statement.
- `demo:long-input-test-cases-input`: Uses a test case with +500 entries.

You can run the scripts by executing the following commands from the root directory of this project:

```bash
# Suggested test case
yarn demo:suggested-test-cases

# +500 entries test case
yarn demo:long-input-test-cases-input
```

After running the command, you'll find the generated output files under the `data` directory.

## Ubiquitous language

Before going forward into the nitty-gritty, I would like to set a ubiquitous language to define some of the concepts that are relative to the domain of this problem. You will find this language used in this document and also in constants and function names across the code.

I hope that setting this foundation will make it easier for you to understand my intentions and the purpose of the code, here we go:

- **Document**: The content of the file produced by the ingenious machine. A document can contain multiple **entries**.
- **Entry**: A string of pipes and spaces (`|`, `_`, ` `) arranged in 3 lines of 27 characters each, representing an **account number**. An entry contains exactly 9 **glyphs**.
    - **Example**:
        ```
          _  _     _  _  _  _  _
        | _| _||_||_ |_   ||_||_|
        ||_  _|  | _||_|  ||_| _|
        ```
- **Glyph**:  A string of pipes and spaces arranged in 3 lines of 3 characters each, representing a digit from 0 to 9.
    - **Example**:
        ```
         _ 
        |_ 
         _|
        ```
- **Account Number**: An array of length 9 containing integers or `null`'s. An account number is parsed from its **entry** representation.
    - **Example**: `[1, 2, 3, 4, null, 6, 7, 8, 9]`
- **Status code**: A string that indicates the state of an **account number**. It can be either `ILL` for an **account number** containing illegible digits or `ERR` for one that does not comply with the checksum definition.

## Architecture overview

## Testing strategy

## Potential improvements

## Final Notes
