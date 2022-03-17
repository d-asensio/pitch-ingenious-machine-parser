# Pitch Coding Challenge - Ingenious Machine Parser

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

I architected the solution to this problem with SOLID principles in mind, especially the **Single Responsibility Principle**, the **Dependency Inversion Principle**, and the **Open/Closed Principle**.

While SOLID principles were originally introduced to solve OOP architectural problems, I think that some of them are also valuable in a FP paradigm.

Starting by the **Single Responsibility Principle**, I will describe the responsibility of each part of the code (that I conveniently split into different files) in a single phrase: 

```bash
 src
 ├── cli.js                   # Manage IO operations
 ├── machineDocumentReader.js # Orchestrate scanning, parsing, and serialization
 ├── parser.js                # Parse entries into account numbers
 ├── scanner.js               # Split entries from a document
 ├── serializer.js            # Serialize account numbers and status codes into human-readable strings
 ├── statusResolver.js        # Determine which is the status code for an account number
 └── validator.js             # Validate if an account number complies with the checksum definition
```

Having small parts with very little responsibility makes the code easier to reason about and more maintainable.

Moving to the **Dependency Inversion Principle**, it is reasonable to highlight that in my solution interfaces are implicit since JavaScript is a dynamically typed language. However, the idea is that the parser, to take an example, will always expose a `parse` function that takes an entry as input and returns the account number that it represents.

This enables to change the parser implementation and ensure that the higher-level modules using it will continue working (as far as the contract is preserved).

An example of how this is useful would be: Imagine that a new requirement appears indicating that now the ingenious machine can also read IBANs (which contain letters). With this approach, we would be able to implement an `ibanParser.parse` function that does the job and inject it to the `scanner` without changing its implementation.

### A note on dependency injection

To achieve dependency injection I used the [revealing module pattern](https://learning.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s03.html) and injected the dependencies through a factory function. This pattern is also useful to manage visibility and encapsulation since functions are protected by the closure and only the public ones are exposed.

> **Clarification**: While it is possible to use the revealing module pattern to do OOP, I did not expose any setter nor getter so the modules do not contain any mutable state.

In this point of the explanation, is easier to expose how the **Open/Closed Principle** was introduced.

Since we have different modules with a single responsibility and high-level modules do not depend on low-level modules. It is easy to rewrite any module and inject it to change the behavior of the code without having to modify anything else.

In this regard, the code is *open for extension but closed for modification*.

### Diagram explaining dependencies between different modules

![Diagram explaining dependencies between different modules](/assets/modules_dependencies_diagram.png)

## Testing strategy

To ensure that the solution works, I used a mix between unit, integration, and manual testing. And I used TDD as an exploration method to increasingly find a robust design.

### Unit tests

Almost all the modules are covered by unit tests because they have very specific responsibilities and unit tests are small and helpful to cover most corner cases.

### Integration tests

The `machineDocumentReader` module is covered by an integration test since it is an orchestrator that does not have business logic.

### Manual tests

I did some manual tests using the suggested test cases and also created other cases. This could also be automated with E2E tests that check the output file contents, but this is a bit more expensive to implement, so I avoided automating that part.

### Mutation testing

As I mentioned before, I used [Striker Mutator](https://stryker-mutator.io/) to do mutation testing and check that my tests were covering the majority of cases. It helped me to spot a bug in my jest configuration (I forgot to set `resetMocks` to `true` and a mock was leaking from one test to another).

Stryker is very easy to set up (just a command) and in my experience, it helps to detect flaws and uncovered paths.

## Final Notes

I enjoyed this challenge so much and regardless of the result I hope you also enjoyed the review.
