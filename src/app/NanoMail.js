export default class NanoMail {
  MAIL_SEND_DELAY = 0;
  RECIPIENTS = {};

  constructor(delay = 0) {
    if (delay) this.MAIL_SEND_DELAY = delay;
  }

  #delyed(fn) {
    if (fn && typeof fn === "function") {
      let tmr = setTimeout(() => {
        clearTimeout(tmr);
        fn();
      }, this.MAIL_SEND_DELAY);
    }
  }

  onReceive(mailId, mailHandler) {
    if (!this.RECIPIENTS[mailId]) this.RECIPIENTS[mailId] = mailHandler;
  }

  send_v1(mail) {
    this.#delyed(() => {
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
    });
  }

  send(mail) {
    this.#delyed(() => {
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
    });
  }
}
