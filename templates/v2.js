const getUserHTML = require("./v2/userHTML");
const getSelfHTML = require("./v2/selfHtml");

const template = (name, email, message, website, dark) => {
  const content = `name: ${name}\n email: ${email}\n message: ${message} ${dark}`;

  const userHTML = getUserHTML(name, email, message, website, dark);
  const selfHTML = getSelfHTML(name, email, message, website, dark);

  return { content, selfHTML, userHTML };
};

module.exports = template;
