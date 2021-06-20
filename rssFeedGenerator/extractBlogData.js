const BLOG_COMMANDS = {
  BLOG_TAGS: "BLOG_TAGS: ",
  BLOG_CREATED_AT: "BLOG_CREATED_AT: ",
  BLOG_PREVIEW_TEXT: "BLOG_PREVIEW_TEXT: ",
  BLOG_HEADLINE: "#",
};

function getContentFromCommand(content, command) {
  const startPos = content.indexOf(command);
  const endPos = content.substring(startPos).indexOf("\n") + startPos;
  const commandContent = content
    .substring(startPos + command.length, endPos)
    .trim();
  return [commandContent, startPos, endPos];
}

function extractBlogData(content) {
  let title = "";
  let body = "";
  let previewText = "";
  let createdDate = new Date();
  let tags = [];

  const [tagsContent] = getContentFromCommand(content, BLOG_COMMANDS.BLOG_TAGS);
  tags = tagsContent.split(", ");

  const [createdDateString] = getContentFromCommand(
    content,
    BLOG_COMMANDS.BLOG_CREATED_AT
  );
  const createdDateArray = createdDateString.split(".");
  if (!!createdDateArray[2] && !!createdDateArray[1] && !!createdDateArray[0]) {
    createdDate = new Date(
      createdDateArray[2] +
        "-" +
        createdDateArray[1] +
        "-" +
        createdDateArray[0]
    );
  }

  const [previewTextContent] = getContentFromCommand(
    content,
    BLOG_COMMANDS.BLOG_PREVIEW_TEXT
  );
  previewText = previewTextContent;
  const [titleContent, , lastHeadlineChar] = getContentFromCommand(
    content,
    BLOG_COMMANDS.BLOG_HEADLINE
  );
  title = titleContent;

  body = content.substring(lastHeadlineChar);

  return {
    title,
    body,
    previewText,
    createdDate,
    tags,
  };
}

module.exports = extractBlogData;
