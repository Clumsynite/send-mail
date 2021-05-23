const { transporter } = require("../config/mail");
const template = require("../templates/v2");

exports.sendMail = async (req, res) => {
  try {
    const { name, email, message, website, dark } = req.body;

    const { content, selfHTML, userHTML } = template(
      name,
      email,
      message,
      website,
      dark
    );

    if (!name || !email || !website || !message)
      return res.json({ err: true, msg: "Error sending mail", userHTML });

    const mail = {
      from: name,
      to: "clusmsyknight@gmail.com",
      subject: `New Message from Contact Form By ${name} @ ${new Date().toISOString()}`,
      text: content,
      html: selfHTML,
    };

    return transporter.sendMail(mail, (err) => {
      if (err) {
        return res.json({
          status: "fail",
          err: true,
          msg: "fail",
        });
      }
      transporter.sendMail(
        {
          from: "clusmsyknight@gmail.com",
          to: email,
          subject: `${name}'s Submission was successful @ ${new Date().toISOString()}`,
          text: `Thank you for contacting me!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nI'll try to get back to you ASAP.\n\n- Clumsyknight`,
          html: userHTML,
        },
        (error, info) => {
          if (error) {
            return res.json({
              err: true,
              msg: `Error sending mail: {error}`,
            });
          }
          return res.json({
            err: false,
            msg: `Message sent: ${info.response}`,
          });
        }
      );
      return res.json({
        status: "success",
        err: false,
        msg: "success",
      });
    });
  } catch (error) {
    return res.json({ err: true, msg: "Failed to send mail", error });
  }
};
