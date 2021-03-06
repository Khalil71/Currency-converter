# Currency Converter

### What you need to install

```
Node.js
```

```
MongoDB
```

### Installing dependencies

```
$ npm i
```

### To run the server

```
$ npm run start
```

### Testing

```
$ npm run test
```

## APIs

Server runs on http://localhost:3000/

### Make convertion from one currency to another

```
POST /
```

body: (from [string]: required) (to [string]: required) (amount [number]: required)

- **Note: amount will only accept up to 2 digits after the decimal point**

### configs

```
src/config/config.js
```

In this file you will be able to configure :-

```
ecbURL: URL to Euro foreign exchange reference rates
```

```
dbURL: URL to local MongoDB
```

```
allowedFloats: Number of digits allowed after decimal point
```

I chose MongoDB over a SQL database simply because I didn't think it would make much of a difference, also it was already installed on my machine.

## Author

- **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
