import { DefaultLinkFactory } from "@projectstorm/react-diagrams";
import MetisLinkModel from "./MetisLinkModel";

export default class MetisLinkFactory extends DefaultLinkFactory {
  constructor() {
    super('metis-link');
  }

  generateModel(): MetisLinkModel {
    return new MetisLinkModel();
  }
}
