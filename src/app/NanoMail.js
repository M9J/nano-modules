export default class NanoMail {
  MAIL_SEND_DELAY = 0;
  RECIPIENTS = {};

  constructor(delay = 0) {
    if (delay) this.MAIL_SEND_DELAY = delay;
  }

  onReceive(mailId, mailHandler) {
    if (!this.RECIPIENTS[mailId]) this.RECIPIENTS[mailId] = mailHandler;
  }

  send(mail) {
    let isSent = false;
    let tmr = setTimeout(() => {
      clearTimeout(tmr);
      if (Array.isArray(mail.to)) {
        for (const broadcastTo of mail.to) {
          if (!this.RECIPIENTS[broadcastTo])
            console.log(`Recipient not found: ${broadcastTo}`);
          else {
            this.RECIPIENTS[broadcastTo](mail);
            isSent = true;
          }
        }
      } else {
        if (!this.RECIPIENTS[mail.to])
          console.log(`Recipient not found: ${mail.to}`);
        else {
          this.RECIPIENTS[mail.to](mail);
          isSent = true;
        }
      }
    }, this.MAIL_SEND_DELAY);
  }
}
