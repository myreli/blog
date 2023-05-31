const EleventyFetch = require("@11ty/eleventy-fetch");

const base_url = `https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Flisted.to%2F%40myreli%2Ffeed`

module.exports = async function() {
  try {

    const feed = await EleventyFetch(`${base_url}`, {
      duration: "1d",
      type: "json"
    });

    if (!feed.version) throw new Error("Unable to fetch Listed Feed due to Listed error.", { feed });


    return {
      notes: feed.items.map((item) => {
        return {
          data: {
            type: "note",
            title: item.title,
            url: item.url.split("/").pop(),
            date: new Date(item.date_published),
            summary: extractFirstPhraseFromDescription(item.summary),
            content: item.content_html,
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
