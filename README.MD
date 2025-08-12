# Custom Tokenizer API (Node + Express)

A simple **character-level tokenizer** with special token support, built using **Node.js** and **Express**.  
Supports:

- **Custom vocab.json**
- **Encode** (text → token IDs)
- **Decode** (token IDs → text)
- Special tokens: `<PAD>`, `<UNK>`, `<BOS>`, `<EOS>`

---

## Features

- **Char-level tokenization**
- **Custom vocabulary file (`vocab.json`)**
- **Special token handling**
- REST API with `GET` and `POST` endpoints
- Easy to test with Postman

---

## Project Structure

```bash
custom-tokenizer/
│
├── data/
│ └── vocab.json # Vocabulary file
│
├── src/
│ ├── index.js # Main entry point
│ └── tokenizer.js # Tokenizer logic
│
├── .gitignore # Ignored files and directories
├── package-lock.json # Lock file
├── package.json # Project configuration
└── README.MD # Project documentation
```

---

## Requirements

install Node.js version 18 or higher [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

---

## Install

```bash
# Clone the repository using HTTPs or SSH
git clone https://github.com/BCAPATHSHALA/custom-tokenizer.git
# or
git clone git@github.com:BCAPATHSHALA/custom-tokenizer.git

# Install dependencies
cd custom-tokenizer
npm install
```

---

## Run the Server

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| `GET`  | `/`       | Health check endpoint      |
| `GET`  | `/vocab`  | Get the vocabulary file    |
| `POST` | `/encode` | Encode text into token IDs |
| `POST` | `/decode` | Decode token IDs into text |

---

## Testing with Postman

You can test the API endpoints using [Postman](https://www.postman.com/).

### Health Check

- Method: `GET`
- Endpoint: `/`

Response:

```json
{
  "status": "ok"
}
```

### Get the Vocabulary File

- Method: `GET`
- Endpoint: `/vocab`

Response:

```json
{
  "vocabSize": 51,
  "tokenToIdSample": {
    "0": 30,
    "1": 31,
    "2": 32,
    "3": 33,
    "4": 34,
    "5": 35,
    "6": 36,
    "7": 37,
    "8": 38,
    "9": 39,
    "<PAD>": 0,
    "<UNK>": 1,
    "<BOS>": 2,
    "<EOS>": 3,
    "a": 4,
    "b": 5,
    "c": 6,
    "d": 7,
    "e": 8,
    "f": 9,
    "g": 10,
    "h": 11,
    "i": 12,
    "j": 13,
    "k": 14,
    "l": 15,
    "m": 16,
    "n": 17,
    "o": 18,
    "p": 19,
    "q": 20,
    "r": 21,
    "s": 22,
    "t": 23,
    "u": 24,
    "v": 25,
    "w": 26,
    "x": 27,
    "y": 28,
    "z": 29,
    " ": 40,
    ",": 41,
    ".": 42,
    "!": 43,
    "?": 44,
    "-": 45,
    "_": 46,
    "@": 47,
    "#": 48,
    ":": 49
  }
}
```

### Encode Text into Token IDs

- Method: `POST`
- Endpoint: `/encode`

Request Body:

```json
{
  "text": "hello, my name is manoj kumar!",
  "addBos": true,
  "addEos": true
}
```

Response:

```json
{
  "ids": [
    2, 11, 8, 15, 15, 18, 41, 40, 16, 28, 40, 17, 4, 16, 8, 40, 12, 22, 40, 16,
    4, 17, 18, 13, 40, 14, 24, 16, 4, 21, 43, 3
  ]
}
```

### Decode Token IDs into Text

- Method: `POST`
- Endpoint: `/decode`

Request Body:

```json
{
  "ids": [
    2, 11, 8, 15, 15, 18, 41, 40, 16, 28, 40, 17, 4, 16, 8, 40, 12, 22, 40, 16,
    4, 17, 18, 13, 40, 14, 24, 16, 4, 21, 43, 3
  ],
  "stripSpecial": true
}
```

Response:

```json
{
  "text": "hello, my name is manoj kumar!"
}
```

---

## Summary

This simple API allows you to encode and decode text into token IDs and vice versa. It's a simple and efficient way to manage text data in your application.
