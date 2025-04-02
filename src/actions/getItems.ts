import { RawItem } from "~/types";
import { fakeFetch } from "../utils/fakeFetch";
import { getRandomItems } from "../utils/getRandomItems";

const MAX_REQUEST_COUNT = 30;
let requestCount = 0;

/* ========================================== */
/* This is just an action with a fake request */
/*  to avoid setting up a real backend, */
/*  details are not important here */
/* ========================================== */

export type GetItemsParams = { id: string };

export const getDocumentChildItems = ({
  id,
}: GetItemsParams): Promise<RawItem[]> => {
  if (++requestCount > MAX_REQUEST_COUNT) {
    console.log(">>> Possible infinite loop detected!");
    throw new Error("Possible infinite loop");
  }

  return fakeFetch(
    () => getRandomItems(id),
    `getChildItems for item ${id}`,
    true,
  );
};
