export default class NanoMail {
  MAIL_SEND_DELAY = 0;
  RECIPIENTS = {};

  constructor(delay = 0) {
    if (delay) this.MAIL_SEND_DELAY = delay;
  }

  onReceive(mailId, mailHandler) {
    if (!this.RECIPIENTS[mailId]) this.RECIPIENTS[mailId] = mailHandler;
  }

  send_v1(mail) {
    let tmr = setTimeout(() => {
      clearTimeout(tmr);
      if (Array.isArray(mail.to)) {
        for (const broadcastTo of mail.to) {
          if (!this.RECIPIENTS[broadcastTo])
            console.log(`Recipient not found: ${broadcastTo}`);
          else {
            this.RECIPIENTS[broadcastTo](mail);
          }
        }
      } else {
        if (!this.RECIPIENTS[mail.to])
          console.log(`Recipient not found: ${mail.to}`);
        else {
          this.RECIPIENTS[mail.to](mail);
        }
      }
    }, this.MAIL_SEND_DELAY);
  }
  
  send(mail) {
    return new Promise((res, rej) => {
      if (Array.isArray(mail.to)) {
        for (const broadcastTo of mail.to) {
          if (!this.RECIPIENTS[broadcastTo]) {
            console.log(`Recipient not found: ${broadcastTo}`);
            rej(false);
          }
          else {
            this.RECIPIENTS[broadcastTo](mail);
            res(true);
          }
        }
      } else {
        if (!this.RECIPIENTS[mail.to]) {
          console.log(`Recipient not found: ${mail.to}`);
          rej(false);
        }
        else {
          this.RECIPIENTS[mail.to](mail);
          res(true);
        }
      }
    });
  }
}
