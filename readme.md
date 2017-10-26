# total
> Work in progress.

[![Build Status](https://travis-ci.org/AlvaroBernalG/total.svg?branch=master)](https://travis-ci.org/AlvaroBernalG/total) [![npm version](https://badge.fury.io/js/total.svg)](https://badge.fury.io/js/total) 

## Install

``` shell
npm install total -g
```

# Commands

* [size](#Size)

## Size

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


## Contributing

All contributions are welcome. Please, refer to the 
[contributing guide](https://github.com/AlvaroBernalG/total/blob/master/CONTRIBUTING.md) for
more information on how to contribute.

## License
MIT © [Alvaro Bernal](https://github.com/AlvaroBernalG/)
