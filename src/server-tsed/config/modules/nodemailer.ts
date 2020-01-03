const MailDevTransport = {
  host: 'localhost',
  port: 1025,
  secure: false,
  ignoreTLS: true
};

export default {
  transportOptions : MailDevTransport,
  emailFrom: "App <noreply@app.com>",
  emailTemplatesOptions : {
    send: true,
    preview: false,
    views: {
      options: {
        extension: 'hbs',
      },
      root: 'src/templates/email',
    },
  }
}
