const EleventyFetch = require("@11ty/eleventy-fetch");

const base_url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Flisted.to%2F%40Myreli%2Ffeed`

module.exports = async function() {
  try {

    const feed = await EleventyFetch(`${base_url}`, {
      duration: "1d",
      type: "json"
    });

    if (!feed.status) throw new Error("Unable to fetch Listed Feed due to Listed error.", { feed });

    return {
      notes: feed.items.map((item) => {
        return {
          data: {
            type: "note",
            title: item.title,
            url: item.link.split("/").pop(),
            date: new Date(item.pubDate.replace(" ", "T")) || new Date(),
            summary: extractFirstPhraseFromDescription(item.description),
            content: item.description,
          }
        }
      }),
    };
  } catch (e) {
    console.log("Failed fetching listed feed, returning 0.", { e });

    return {
      notes: [],
    };
  }
};

function extractFirstPhraseFromDescription(description) {
  const regex = /<p>(?:<(?:\/)?[^>]+>)*([^<].*?)<\/p>/i;
  const match = description.match(regex);
  if (match) {
    const firstPhrase = match[1].replace(/<[^>]+>/g, '');
    return firstPhrase.trim();
  }
  return '';
}
