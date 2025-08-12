import express from "express";
import tokenizer from "./tokenizer.js";

const { encode, decode, tokenToId } = tokenizer;
const app = express();

// Middleware
app.use(express.json());

// API Health Check
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// API Endpoint 1: /vocab - return summary of vocab
app.get("/vocab", (_req, res) => {
  res.json({
    vocabSize: Object.keys(tokenToId).length,
    tokenToIdSample: Object.fromEntries(Object.entries(tokenToId).slice(0, 50)), // ex: { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5 }
  });
});

// API Endpoint 2: /encode - encode text to IDs
app.post("/encode", (req, res) => {
  const { text, addBos = false, addEos = false } = req.body || {}; // ex: { text: "abcde", addBos: true, addEos: true }

  if (typeof text !== "string") {
    return res.status(400).json({ error: "text (string) is required in body" });
  }

  const ids = encode(text, { addBos, addEos }); // ex: "abcde" -> [1, 2, 3, 4, 5]
  res.json({ ids });
});

// API Endpoint 3: /decode - decode IDs to text
app.post("/decode", (req, res) => {
  const { ids, stripSpecial = true } = req.body || {}; // ex: { ids: [1, 2, 3, 4, 5], stripSpecial: true }

  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ error: "ids (array of integers) is required in body" });
  }

  const text = decode(ids, { stripSpecial }); // ex: [1, 2, 3, 4, 5] -> "abcde"
  res.json({ text });
});

// Start server and listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Custom tokenizer API listening on http://localhost:${PORT}`);
});
