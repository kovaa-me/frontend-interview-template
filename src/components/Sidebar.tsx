import { ListItem } from "./ListItem";
import { getRandomEmoji } from "../utils/getRandomEmoji";
import { SidebarActions } from "./SidebarActions";
import type { RawItem } from "../types";

// this is the static root item
// let's assume all workspaces have this root item
// you can start with rendering it and then requesting
// child items for it
const rootItem: RawItem = {
  title: "Root",
  id: "root",
  emoji: getRandomEmoji(),
  parent: undefined,
};

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarActions />
      <div>
        <div className="sidebarSectionTitle">Workspaces</div>
        <ListItem id={rootItem.id} />
      </div>
    </div>
  );
};
