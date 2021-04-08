import { Block, BlockType, Model, EmptyModel, Properties } from '../store/types';
import operatorMetaInfos from './pytorch-metadata.json';

export function printOptionValue(value: any): string {
  if (value === true) {
    return 'True';
  }
  if (value === false) {
    return 'False';
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return JSON.stringify(value);
}

export function createParams(type: BlockType): Properties {
  const meta = operatorMetaInfos.find((meta) => meta.abbrev === type);
  const parameters = {};
  for (const attribute of meta.schema.attributes) {
    parameters[attribute.name] = printOptionValue(attribute.default);
  }
  return parameters;
}

export function getOrderedAttrNames(type: BlockType): string[] {
  const operatorMetaInfo = operatorMetaInfos.find((metaInfo) => metaInfo.abbrev === type);
  const attrNames = [];
  if (!operatorMetaInfo || !operatorMetaInfo.schema) {
    return attrNames;
  }
  for (const attribute of operatorMetaInfo.schema.attributes) {
    attrNames.push(attribute.name);
  }
  return attrNames;
}

export default class InitConverter {
  private blocks: { [id: string]: Block };

  private readonly bodyBlockList: string[];

  private readonly inputBlockList: string[];

  private readonly outputBlockList: string[];

  private resultInit: string;

  private readonly indentSize: string;

  private readonly indentDepth: number;

  private options: string;

  constructor() {
    this.blocks = EmptyModel.blocks;
    this.bodyBlockList = [];
    this.inputBlockList = [];
    this.outputBlockList = [];
    this.resultInit = `\n\n`;
    this.indentSize = `    `;
    this.indentDepth = 1;
    this.options = '';
  }

  orderedBlockList(blocks: { [id: string]: Block }): void {
    for (const [, blockItem] of Object.entries(blocks)) {
      if (blockItem.type === BlockType.In) {
        this.inputBlockList.push(blockItem.id);
      } else if (blockItem.type === BlockType.Out) {
        this.outputBlockList.push(blockItem.id);
      } else {
        this.bodyBlockList.push(blockItem.id);
      }
    }
  }

  updateInitFront(model: Model): void {
    this.resultInit = `\n\n`;
    this.resultInit += `class ${model.name}(torch.nn.Module):\n`;
    this.resultInit += this.indentSize;
    this.resultInit += `def __init__(self):\n`;
    for (let i = 0; i < this.indentDepth + 1; i += 1) {
      this.resultInit += this.indentSize;
    }
    this.resultInit += `super(${model.name}, self).__init__()\n`;
  }

  updateInitBody(blocks: { [id: string]: Block }): void {
    this.orderedBlockList(blocks);
    this.resultInit += `\n`;
    for (const blockId of this.bodyBlockList) {
      for (let i = 0; i < this.indentDepth + 1; i += 1) {
        this.resultInit += this.indentSize;
      }
      this.resultInit += `self.${blocks[blockId].name} = nn.${blocks[blockId].type}(`;
      this.updateOption(blocks[blockId]);
      this.resultInit += `) \n`;
    }
  }

  updateOption(block: Block): void {
    const idx = operatorMetaInfos.findIndex((metaInfo) => metaInfo.abbrev === block.type);
    const options = [];

    for (const attr of operatorMetaInfos[idx].schema.attributes) {
      const camlAttr = attr.name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      const attrValue = block.parameters[camlAttr];
      // TODO: Need convert function to validate equality between default-value and assigned-value
      if (attr.default === attrValue) {
        continue;
      }
      if (attr.visible !== false) {
        options.push(`${attr.name}=${printOptionValue(attrValue)}`);
      } else {
        options.push(`${printOptionValue(attrValue)}`);
      }
    }
    this.resultInit += options.join(', ');
  }

  getResult(): string {
    return this.resultInit;
  }
}
