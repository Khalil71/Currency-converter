# Currency Converter

### What you need to install

```
Node.js
```

```
MongoDB
```

```
Postman
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

I chose MongoDB simply it didn't make such of a difference to me also because it was already installed on my machine

## Author

- **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
