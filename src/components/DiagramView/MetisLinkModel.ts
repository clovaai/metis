import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export default class MetisLinkModel extends DefaultLinkModel {
  private linkID: string;

  constructor() {
    super({
      type: 'metis-link',
    });
  }

  setLinkID(linkID: string): void {
    this.linkID = linkID;
  }

  getLinkID(): string {
    return this.linkID;
  }
}
