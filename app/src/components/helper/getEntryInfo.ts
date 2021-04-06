interface EntryInterface {
  title: string,
  description?: string,
  image?: string;
}

type EntryListInterface<T> = {
  [key: number]: T
}

export function getEntryInfo<L extends EntryListInterface<EntryInterface>>
(infoList: L, prop: keyof EntryInterface, id: number): string {

  const infoList_ids = Object.keys(infoList);
  let idToUse = id;
  // on values under 0, the latest entry will used
  if (id < 0 && !!infoList_ids[infoList_ids.length - 1]) {
    idToUse = Number(infoList_ids[infoList_ids.length - 1]);
  }

  if (infoList[idToUse] !== undefined) {
    const value = infoList[idToUse][prop];
    if (value !== undefined) {
      return value;
    }
  }
  return "";
}
