# total
> Work in progress.  
[![Build Status](https://travis-ci.org/AlvaroBernalG/total.svg?branch=master)](https://travis-ci.org/AlvaroBernalG/total) [![npm version](https://badge.fury.io/js/total.svg)](https://badge.fury.io/js/total) 

## Install

``` shell
npm install total -g
```

# List of commands

* [size](#Size)
* [tp](#tp)

## * size
File/Directory size.

### Usage

Takes a list of file paths and return the total size:

```shell
$ find . -name '*.js' | total --size 
22969
```

You can specify the size unit as second parameter (kb|mb|gb) 

```shell
$ find . -name '*.js' | total -s kb
22.969
```

 ## * tp
Text processor.

### Usage

Returns the number of characters
```shell
$ echo 'hello\nworld' | total --tp 
13
```

Returns the length of the longest line
```shell
$ echo 'hello\nworld' |  total --tp L
5
```

Returns the number of lines
```shell
$ echo 'hello\nworld' |  total --tp l
2
```

Returns the number of words
```shell
$ cat text.txt
hello world
$ total --tp w < text.txt
2
```

## Contributing

All contributions are welcome.

## License
MIT © [Alvaro Bernal](https://github.com/AlvaroBernalG/)
