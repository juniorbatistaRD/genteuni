export default function extractTextFromPost(blocks) {
  const text = [];

  const getText = (element) => {
    switch (element.type) {
      case "paragraph":
        return element.data.text;
      case "header":
        return element.data.text;
      case "quote":
        return element.data.text;
      case "code":
        return element.data.code;
      default:
        return " ";
    }
  };

  blocks.map((element) => {
    return text.push(getText(element));
  });

  const textWithHtml = text.join(" ");

  var tmp = document.createElement("div");
  tmp.innerHTML = textWithHtml;

  const textWithOutHtml = tmp.textContent || tmp.innerText;

  if (textWithOutHtml.length > 259) {
    return textWithOutHtml.slice(0, 260).concat("...");
  }

  return textWithOutHtml.slice(0, 260);

  // .replace(/<[^>]*>?/gm, "");
}
