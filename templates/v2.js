const template = (name, email, message, website, dark) => {
  const content = `name: ${name}\n email: ${email}\n message: ${message} ${dark}`;
  const colors = {
    heading: "cyan",
    signature: "#4dff79",
    link: "#00ffbf",
    text: "aquamarine",
    info: "#42babd",
  };
  const fonts = { text: "16px", signature: "19px", info: "12px" };
  const selfHTML = `
  <body style="background-color: black; padding: 10px;">
    <h1 style="width: 100%; text-align: center; color:${colors.heading};">
      New Email from <a href="${website}" target="_blank" title=${website} style="color: ${colors.link}; text-decoration: none;"> here</a>
    </h1>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Name: </b> ${name}</p>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Email: </b><span style="color: ${colors.link}; text-decoration: none;">${email}</span></p>
    <p style="color: ${colors.text}; font-size: ${fonts.text};white-space: pre;"><b>Message: </b> ${message}</p>
  </body>`;

  const userHTML = `
    <div style="padding: 20px;background-color: black;">
      <h1 style="width: 100%; text-align: center; color:${colors.heading}; margin-bottom: 5px;">Thank you for contacting me!</h1>
      <div style="margin-top: 30px;">
        <h2 style="color: azure;">Form Details: </h2>
        <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Name: </b> ${name}</p>
        <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Email: </b><span style="color: ${colors.link}; text-decoration: none;">${email}</span></p>
        <p style="color: ${colors.text}; font-size: ${fonts.text};white-space: pre;"><b>Message: </b> ${message}</p>
        <p style="color: ${colors.signature}; font-size: ${fonts.signature}; width: 100%; text-align: right">I'll try to get back to you ASAP<br/> - <em>Rishabh Pathak</em></p>
      </div>
      <div style="color:${colors.info}; font-size: ${fonts.info}; width: 100%; text-align: center; margin-top: 40px;">
        I apologise If you haven't filled any form and yet received this email.<br/>
        There might be someone else who has used your email (by mistake).
        <p>
          Form address: <a href="${website}" target="_blank" title="Email has sent after filling this form"style=" color: ${colors.link}; text-decoration: none;"> ${website}</a>
        </p>
      </div>
    </div>`;

  return { content, selfHTML, userHTML };
};

module.exports = template;
