import { DefaultPortModel } from "@projectstorm/react-diagrams";
import MetisLinkModel from "./MetisLinkModel";

export default class MetisPortModel extends DefaultPortModel {
  createLinkModel(): MetisLinkModel {
    return new MetisLinkModel();
  }
}
