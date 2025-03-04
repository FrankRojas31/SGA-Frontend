export interface IItem {
  id: number
  name: string
  description: string
}

export type IItemSend = Omit<IItem, "id" >;
