const Feed = require("feed").Feed;
const markdown = require("markdown").markdown;
const fs = require("fs");
const dotenvConfig = require("dotenv").config();
const extractBlogData = require("./extractBlogData.js");

if (!!dotenvConfig.error) {
  console.error(dotenvConfig.error);
}
const environment = dotenvConfig.parsed;

async function generateRssFeed() {
  const baseUrl = environment.BASE_URL;
  const publicDir = environment.PUBLIC_DIR;
  const blogDir = publicDir + environment.BLOG_DIR;
  const rssDir = environment.RSS_DIR;
  const currentDate = new Date();
  const author = {
    name: environment.AUTHOR_NAME,
    email: environment.AUTHOR_EMAIL,
    link: environment.AUTHOR_LINK,
  };
  const feed = new Feed({
    title: environment.BLOG_TITLE,
    description: environment.BLOG_DESCRIPTION,
    id: baseUrl,
    link: baseUrl,
    language: "de",
    image: `${baseUrl}${environment.BLOG_BASE_URL_IMAGE}`,
    favicon: `${baseUrl}${environment.BLOG_BASE_URL_FAVICON}`,
    copyright: `All rights reserved ${currentDate.getFullYear()}, Buck Ubel`,
    updated: currentDate,
    generator: "nothing",
    feedLinks: {
      rss2: `${baseUrl}${rssDir}${environment.BLOG_BASE_URL_RSS2}`,
      json: `${baseUrl}${rssDir}${environment.BLOG_BASE_URL_JSON}`,
    },
    author,
  });

  const files = fs.readdirSync(blogDir);
  const posts = files.map((v) => {
    return fs.readFileSync(blogDir + v).toString();
  });
  posts.forEach((post, i) => {
    const url = `${baseUrl}blog/${i}`;
    const { title, body, previewText, createdDate, tags } =
      extractBlogData(post);
    tags.forEach((v) => {
      const founded = feed.categories.findIndex((w) => v === w) > -1;
      if (!founded) {
        feed.addCategory(v);
      }
    });
    feed.addItem({
      id: i,
      title: title,
      link: url,
      description: previewText,
      content: markdown.toHTML(body),
      author: [author],
      contributor: [author],
      date: createdDate,
      category: tags.map((v) => ({
        name: v,
      })),
    });
  });
  console.log(
    "\x1b[36m%s\x1b[0m",
    `${feed.items.length}`,
    `blog entries was generated.`
  );
  console.log(
    "%s\x1b[36m%s\x1b[0m",
    `Categories are: `,
    `${feed.categories.join(", ")}`
  );

  fs.mkdirSync(`${publicDir}${rssDir}`, { recursive: true });
  fs.writeFileSync(
    `${publicDir}${rssDir}${environment.BLOG_BASE_URL_RSS2}`,
    feed.rss2()
  );
  fs.writeFileSync(
    `${publicDir}${rssDir}${environment.BLOG_BASE_URL_JSON}`,
    feed.json1()
  );
}

generateRssFeed();
