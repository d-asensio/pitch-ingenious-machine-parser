# Data transformation challenge

Please complete this exercise using the language of your preference - the choice will not be evaluated during the review. If you can, choose Clojure/ClojureScript to make reviewing process easier for us.

The exercise is divided into three parts, each building on the previous. You should spend no more than two hours in total, and should try to complete as many parts as possible.

You may decide yourself on what environment you want to run your solution in, but please document how the reviewers should run it. Testing is not strictly required, but you should be able to explain why you are confident that your solution works.

Please submit your solution in a zip format.

The challenge will be anonymized for our engineers to review. Please help us by avoiding any mentions to your name in the source code. 

Thank you!

## Problem

### Part 1

You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices. The machine scans the paper documents, and produces a file with a number of entries which each look like this:

```
    _  _     _  _  _  _  _
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
```

Each entry is 4 lines long, and each line has 27 characters. The first 3 lines of each entry contain an account number written using pipes and underscores, and the fourth line is blank. Each account number should have 9 digits, all of which should be in the range 0-9. A normal file contains around 500 entries.

Your first task is to write a program that can take this file and parse it into actual account numbers.

### Part 2

Having done that, you quickly realize that the ingenious machine is not in fact infallible. Sometimes it goes wrong in its scanning. The next step therefore is to validate that the numbers you read are in fact valid account numbers. A valid account number has a valid checksum. This can be calculated as follows:

```
account number:  3  4  5  8  8  2  8  6  5
position names:  d9 d8 d7 d6 d5 d4 d3 d2 d1
checksum calculation: (d1+2*d2+3*d3 +..+9*d9) mod 11 = 0
```

So now you should also write some code that calculates the checksum for a given number, and identifies if it is a valid account number.

### Part 3

Your boss is keen to see your results. She asks you to write out a file of your findings, one for each input file, in this format:

```
457508000
664371495 ERR
86110??36 ILL
```

i.e. the file has one account number per row. If some characters are illegible, they are replaced by a `?`. In the case of a wrong checksum, or illegible number, this is noted in a second column indicating status.

## Clues

It can be helpful to write out 3x3 cells on 3 lines in your code, so they form identifiable digits. Even if your code actually doesn't represent them like that internally. Most people would much rather read

```
"   " +
"|_|" +
"  |"
```

than

```
"   |_|  |"
```


Remember to be very careful to read the definition of checksum correctly. It is not a simple dot product, the digits are reversed from what you might expect.


## Suggested Test Cases

```
use case 1
 _  _  _  _  _  _  _  _  _
| || || || || || || || || |
|_||_||_||_||_||_||_||_||_|

=> 000000000

  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |

=> 111111111
 _  _  _  _  _  _  _  _  _
 _| _| _| _| _| _| _| _| _|
|_ |_ |_ |_ |_ |_ |_ |_ |_

=> 222222222
 _  _  _  _  _  _  _  _  _
 _| _| _| _| _| _| _| _| _|
 _| _| _| _| _| _| _| _| _|

=> 333333333

|_||_||_||_||_||_||_||_||_|
  |  |  |  |  |  |  |  |  |

=> 444444444
 _  _  _  _  _  _  _  _  _
|_ |_ |_ |_ |_ |_ |_ |_ |_
 _| _| _| _| _| _| _| _| _|

=> 555555555
 _  _  _  _  _  _  _  _  _
|_ |_ |_ |_ |_ |_ |_ |_ |_
|_||_||_||_||_||_||_||_||_|

=> 666666666
 _  _  _  _  _  _  _  _  _
  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |

=> 777777777
 _  _  _  _  _  _  _  _  _
|_||_||_||_||_||_||_||_||_|
|_||_||_||_||_||_||_||_||_|

=> 888888888
 _  _  _  _  _  _  _  _  _
|_||_||_||_||_||_||_||_||_|
 _| _| _| _| _| _| _| _| _|

=> 999999999
    _  _     _  _  _  _  _
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|

=> 123456789

use case 3
 _  _  _  _  _  _  _  _    
| || || || || || || ||_   |
|_||_||_||_||_||_||_| _|  |

=> 000000051
    _  _  _  _  _  _     _
|_||_|| || ||_   |  |  | _
  | _||_||_||_|  |  |  | _|

=> 49006771? ILL
    _  _     _  _  _  _  _
  | _| _||_| _ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _

=> 1234?678? ILL
```
