import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Step 1: load vocab file as JSON
const vocabPath = join(__dirname, "..", "data", "vocab.json");
const raw = readFileSync(vocabPath, "utf8");
const vocab = JSON.parse(raw); // ex: { "specialTokens": { "<PAD>": 0, "<UNK>": 1, "<BOS>": 2, "<EOS>": 3 } }

// Step 2: parse vocab file to tokenToId and idToToken
const tokenToId = vocab.tokenToId || {};
const idToToken = vocab.idToToken || {};
const special = vocab.specialTokens || {};

// Step 3: define special token IDs for encoding and decoding
const PAD_ID = special["<PAD>"];
const UNK_ID = special["<UNK>"];
const BOS_ID = special["<BOS>"];
const EOS_ID = special["<EOS>"];

// Step 4: define helper functions for encoding and decoding text
function normalize(text) {
  // simple normalization: lowercase and trim
  if (typeof text !== "string") {
    return "";
  }
  return text.normalize("NFKC"); // What is NFKC(normalize key composition): https://unicode.org/reports/tr15/ , & Why use it: this is a unicode normalization form that is better for NLP(natural language processing)
}

// Step 5: define encoding and decoding functions for text
function encode(text, options = {}) {
  const { addBos = false, addEos = false } = options; // BOS: beginning of sentence, EOS: end of sentence
  const normalized = normalize(text);
  const ids = [];

  // add special tokens for encoding as beginning of text
  if (addBos) {
    ids.push(BOS_ID);
  }

  // encode text char-by-char and map to IDs
  for (let ch of normalized) {
    // simple char-level mapping
    const lower = ch.toLowerCase();

    // map to ID or UNK_ID
    if (tokenToId.hasOwnProperty(lower)) {
      ids.push(tokenToId[lower]);
    } else {
      ids.push(UNK_ID);
    }
  }

  // add special tokens for encoding as end of text
  if (addEos) {
    ids.push(EOS_ID);
  }

  // add special tokens for encoding as end of text
  return ids; // ex: [1, 2, 3, 4, 5]
}

// Step 6: define encoding and decoding functions for text
function decode(ids, options = {}) {
  const { stripSpecial = true } = options;

  // map IDs to tokens for decoding
  const tokens = ids.map((id) => {
    const key = String(id);
    return idToToken.hasOwnProperty(key) ? idToToken[key] : "<UNK>"; // ex: "1" -> "a" or "<UNK>"
  });

  // join tokens directly (char-level) or If special tokens exist, remove them if requested
  let text = tokens.join("");
  if (stripSpecial) {
    // remove special token strings if they accidentally appear
    text = text.replace(/<BOS>|<EOS>|<PAD>|<UNK>/g, "");
  }

  // return decoded text as string
  return text; // ex: "abcde"
}

// Step 7: export encoding and decoding functions for text
export default {
  encode,
  decode,
  tokenToId,
  idToToken,
  PAD_ID,
  UNK_ID,
  BOS_ID,
  EOS_ID,
};
