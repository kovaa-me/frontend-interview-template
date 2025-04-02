export type ItemId = string;

export interface RawItem {
  id: ItemId;
  title: string;
  emoji: string;
  parent?: ItemId;
}
