import NanoDOM from "../app/NanoDOM";

export default class Footer extends NanoDOM {
  constructor() {
    super();
    this.addClass("nano_modules_footer");
    const footerRow1 = this.footerRow1();
    const footerRow2 = this.footerRow2();
    this.appendChild(footerRow1.node);
    this.appendChild(footerRow2.node);
    return this.node;
  }

  footerRow1() {
    const node = new NanoDOM("div");
    node.addClass("nano_modules_footer_row");
    const link = new NanoDOM("a");
    link.addClass("github-badge");
    link.node.href = "https://github.com/m9j/nano-modules/actions";
    const githubBadgeLabel = new NanoDOM("div");
    githubBadgeLabel.addClass("github-badge-label");
    githubBadgeLabel.setInnerHTML("nano-modules");
    const githubBadgeStatus = new NanoDOM("div");
    githubBadgeStatus.addClass("github-badge-stage");
    githubBadgeStatus.setInnerHTML("ACTIONS");
    link.appendChild(githubBadgeLabel.node);
    link.appendChild(githubBadgeStatus.node);
    node.appendChild(link.node);
    return node;
  }

  footerRow2() {
    const node = new NanoDOM("div");
    node.addClass("nano_modules_footer_row");
    const link = new NanoDOM("a");
    link.addClass("github-badge");
    link.node.href = "https://github.com/m9j/nano_modules/actions";
    const githubBadgeLabel = new NanoDOM("div");
    githubBadgeLabel.addClass("github-badge-label");
    githubBadgeLabel.setInnerHTML("nano_modules");
    const githubBadgeStatus = new NanoDOM("div");
    githubBadgeStatus.addClass("github-badge-stage");
    githubBadgeStatus.setInnerHTML("ACTIONS");
    link.appendChild(githubBadgeLabel.node);
    link.appendChild(githubBadgeStatus.node);
    node.appendChild(link.node);
    return node;
  }
}
