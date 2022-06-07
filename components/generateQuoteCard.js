// calculte height of the svg, based on quote length
function calculateHeight(length) {
  let lines = Math.floor(length / 88);
  let height = lines > 2 ? (lines - 2) * 21 + 130 : 130;
  return height;
}

export default async function generateQuoteCard(quote) {
  // dynamic height of svg
  const height = await calculateHeight(quote.text.length);

  // quote svg card
  const card = await `
<svg width="700px" height="${parseInt(
    height
  )}px" fill="none" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
                .container {
                    border: 2px solid #8ac926;
                    border-radius: 10px;
                    background: white;
                }

                .text {
                    padding: 0.5rem;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .quote-text {
                    color: black;
                }

                .author {
                    color: black;
                    text-align: right;
                    font-size: 12px;
                    margin-top: 30px;
                    margin-right: 20px;
                }
            </style>
            <div class="container">
                <div class="text">
                    <p class="quote-text">
                        <b>${quote.text}</b>
                    </p>
                    <p class="author">
                        <b>- <i>${quote.from}</i>
                        </b>
                    </p>
                </div>
            </div>
        </div>
    </foreignObject>
</svg>`;

  return card;
}
