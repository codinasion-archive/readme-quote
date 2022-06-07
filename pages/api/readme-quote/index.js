import generateQuoteCard from "../../../components/generateQuoteCard";

import quotes from "../../../quotes.json";

export default async function handler(req, res) {
  const randomIndex = await Math.floor(
    Math.random() * Object.keys(quotes).length
  );
  const card = await generateQuoteCard(quotes[randomIndex]);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(card);
}
