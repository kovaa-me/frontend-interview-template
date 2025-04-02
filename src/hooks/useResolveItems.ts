import useResolver from "~/hooks/useResolver";
import { getDocumentChildItems, GetItemsParams } from "~/actions/getItems";
import { RawItem } from "~/types";
type FetchResult = RawItem[];

type ResolverParams = GetItemsParams & { title: string };

const useResolveItems = ({ id, title }: ResolverParams) => {
  return useResolver<GetItemsParams, FetchResult>(getDocumentChildItems, {
    requestParams: { id },
    queryParams: { prefetch: true },
    cacheOptions: { key: `${id}_${title}` },
  });
};

export default useResolveItems;
