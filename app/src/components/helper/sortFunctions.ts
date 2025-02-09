import {FilteredOnType} from "./utilTypes";

export function sortString<ObjectType>(key: keyof FilteredOnType<ObjectType, string>, desc: boolean = false) {
  const descFactor = desc ? -1 : 1;
  return (a: ObjectType, b: ObjectType) => {
    const valueA = (a[key] as any as string).toUpperCase();
    const valueB = (b[key] as any as string).toUpperCase();
    if (valueA < valueB) {
      return -1 * descFactor;
    }
    if (valueA > valueB) {
      return 1 * descFactor;
    }
    return 0;
  }
}

export function sortNumber<ObjectType>(key: keyof FilteredOnType<ObjectType, number>, desc: boolean = false) {
  const descFactor = desc ? -1 : 1;
  return (a: ObjectType, b: ObjectType) => {
    const valueA = (a[key] as any as number);
    const valueB = (b[key] as any as number);
    return (valueB - valueA) * descFactor
  }
}

export function sortObjectKeys<ObjectType extends Object>(anyObject: ObjectType): ObjectType {
  return Object.keys(anyObject).sort().reduce(
    (obj, key) => {
      obj[key as keyof ObjectType] = anyObject[key as keyof ObjectType];
      return obj;
    },
    {} as ObjectType
  );
}
