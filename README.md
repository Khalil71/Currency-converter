# Cache APIs

### Prerequisites

What you need to install

```
node.js
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

### Make convertion from once currency to another

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

## Author

- **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
