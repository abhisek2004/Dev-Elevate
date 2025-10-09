import * as tf from "@tensorflow/tfjs";
import { pipeline } from "@xenova/transformers";

const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

export async function semanticSearch(query, notes, topK = 5) {
  const queryEmbedding = await embedder(query);
  const embeddings = await Promise.all(notes.map(n => embedder(n.content)));

  const similarities = embeddings.map((e, i) => ({
    note: notes[i],
    score: cosineSimilarity(e, queryEmbedding),
  }));

  return similarities.sort((a, b) => b.score - a.score).slice(0, topK);
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((s, ai, i) => s + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, ai) => s + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((s, bi) => s + bi * bi, 0));
  return dot / (magA * magB);
}
