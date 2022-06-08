import generateQuoteCard from "../../../components/generateQuoteCard";

import quotes from "../../../quotes.json";

const quote404 = {
  text: "No quote found for the requested category",
  from: "Codinasion",
};

export default async function handler(req, res, quote) {
  if (quote !== undefined) {
    const card = await generateQuoteCard(quote);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(card);
  } else {
    const { mode, category } = req.query;
    var apiQuotes = undefined;

    if (category !== undefined) {
      apiQuotes = await quotes.filter(function (quote) {
        return quote.type.toLowerCase() === category.toLowerCase();
      });
    } else {
      apiQuotes = quotes;
    }

    if (mode === "text") {
      if (apiQuotes.length === 0) {
        res.setHeader("Content-Type", "text/plain");
        res.send(quote404.text);
      }
      const randomIndex = await Math.floor(
        Math.random() * Object.keys(apiQuotes).length
      );
      res.setHeader("Content-Type", "text/plain");
      res.send(apiQuotes[randomIndex].text);
    } else {
      if (mode === "json") {
        if (apiQuotes.length === 0) {
          res.setHeader("Content-Type", "application/json");
          res.send(quote404);
        }
        const randomIndex = await Math.floor(
          Math.random() * Object.keys(apiQuotes).length
        );
        res.setHeader("Content-Type", "application/json");
        res.send(apiQuotes[randomIndex]);
      } else {
        if (apiQuotes.length === 0) {
          const card = await generateQuoteCard(quote404);
          res.setHeader("Content-Type", "image/svg+xml");
          res.send(card);
        }
        const randomIndex = await Math.floor(
          Math.random() * Object.keys(apiQuotes).length
        );
        const card = await generateQuoteCard(apiQuotes[randomIndex]);
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(card);
      }
    }
  }
}
