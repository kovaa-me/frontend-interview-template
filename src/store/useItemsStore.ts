import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { useShallow } from "zustand/shallow";

import { ItemId, RawItem } from "~/types";
import { getRandomEmoji } from "~/utils/getRandomEmoji";

const normilize = <T>(els: T[], key: string, schema?: (el: T) => void) =>
  els.reduce(
    (acc, el) => {
      // return ({ ...acc, [el[key]]: schema ? schema(el) : el });
      // return Object.assign(acc[[el[key]]]: schema ? schema(el) : el });
      acc[el[key]] = schema ? schema(el) : el
      return acc;
    },
    {},
  );

type Item = RawItem & {
  isLoading: boolean;
  isOpen: boolean;
  childrens: ItemId[] | [];
  error?: Error;
};

const defaultOptions = {
  isLoading: false,
  isOpen: false,
  childrens: [],
};

const itemSchema = (entity) => {
  return { ...entity, ...defaultOptions };
};

const rootItem: RawItem = {
  title: "Root",
  id: "root",
  emoji: getRandomEmoji(),
};

type Collection<Entity, Key extends string> = {
  [key in Key]: Entity;
};

type ItemCollection = Collection<Item, ItemId>;

type ItemsState = {
  items: ItemCollection;

  setItemsState: (items: Item[]) => ItemCollection;
  setItem: (id: ItemId, newState: Partial<Item>) => Item;

  selectItem: (id: ItemId) => Item;
  selectItems: () => Item[];
}

const initState: {
  items: ItemCollection;
} = {
  items: { [rootItem.id]: { ...rootItem, ...defaultOptions }, },
  itemIds: ['root'],
};

export const useItemsStore = create(devtools((set, get) => {
  const selectItems = () => get().items;
  const selectItem = (id: ItemId) => selectItems()[id];

  const setItemsState = (items: Item[]) =>
    set((state) => {


      const normilized = normilize(items, "id", itemSchema);
      return { items: { ...state.items, ...normilized } };
    });


  const setParents = (items: Item[]) => {
    const ids = items.map((item) => {
      const parent = selectItem(item.parent);

      return item.id;

    })
    items.forEach((element) => {
      if (!element.parent) {
        return
      }

      const parent = selectItem(element.parent);
      console.log({ parent }, "logg#57~src/store/useItemsStore.ts");

      setItem(element.parent, {
        childrens: [...parent.childrens, element.id],
      });
    });
  }


  const setItem = (id: ItemId, newState: Partial<Item>) =>
    set((state) => {
      const item = get().items[id];

      return { items: { ...state.items, [item.id]: { ...item, ...newState } } };
    });

  return {
    ...initState,
    setItemsState,
    setItem,
    setParents,

    selectItem,
    selectItems,
  };
}));


const selectItemsFromState = (state) => state.items;
const selectItemFromState = (state, { id }) => selectItemsFromState(state)[id];


const selectItems = () => useItemsStore(
  useShallow((state) => selectItemsFromState(state))
)

const selectItemm = (id: ItemId) => useItemsStore(
  useShallow((state) => selectItemFromState(state, { id }))
)
