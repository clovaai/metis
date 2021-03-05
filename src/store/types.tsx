export enum DiagramType {
  Main = 'Main',
  Module = 'Module',
}

export enum BlockType {
  In = 'In',
  Out = 'Out',
  Conv2d = 'Conv2d',
  BatchNorm2d = 'BatchNorm2d',
  ReLU = 'ReLU',
  MaxPool2d = 'MaxPool2d',
}

export const PreservedBlockTypes = new Set([BlockType.In, BlockType.Out]);

export type Position = {
  x: number;
  y: number;
};

export type PropertyValue = string | number | boolean;
export type Properties = { [key: string]: PropertyValue };

export type Block = {
  id: string;
  name: string;
  type: BlockType;
  position: Position;
  repeats?: number;
  parameters?: Properties;
};

export type Link = {
  id: string;
  from: string;
  to: string;
};

export type Dependency = {
  id: string;
  name: string;
  alias?: string;
  package?: string;
};

export type DiagramInfo = {
  offset: Position;
  zoom: number;
};

export type Model = {
  id: string;
  name: string;
  type: DiagramType;
  dependencies: { [id: string]: Dependency };
  blocks: { [id: string]: Block };
  links: { [id: string]: Link };
};

export type Project = {
  id: string;
  name: string;
  models: { [modelID: string]: Model };
};

export type LocalState = {
  diagramInfo: DiagramInfo;
  selectedModelID?: string;
  selectedBlockID?: string;
};

export type AppState = {
  counter: number; // TODO: repainting with mutable.
  local: LocalState;
  remote?: any; // TODO: compatibility issue with immer and Yorkie
};

export const EmptyModel = {
  id: '',
  name: '',
  type: DiagramType.Main,
  diagramInfo: {},
  dependencies: {},
  blocks: {},
  links: {},
};
