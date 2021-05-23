/**
 * Change types of all properties of I to the type T
 * interface A {
 *   prop1: number
 * }
 * type B = InterfaceChangedPropTypes<A, any>
 *   -> B = {prop1:any}
 */
export type InterfaceChangedPropTypes<I, T> = {
  [P in keyof I]: T;
};

/**
 * Filtered all properties with the type of 'Condition'.
 * e.g:
 * type A = FilteredOnType<{id:number, name: string}, string>
 * type A = {name:string}
 */
export type FilteredOnType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;
/**
 * Filtered all properties without the type of 'Condition'.
 * e.g:
 * type A = FilteredOnType<{id:number, name: string}, string>
 * type A = {:number}
 */
export type FilteredOnNotType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
  }[keyof Base]
>;
/**
 * Get all keys from properties with the type of 'Condition'.
 * e.g:
 * type A = ExtractFilteredOnTypeKeys<{id:number, firstName: string, secondName: string}, string>
 * type A = 'firstName' | 'secondName'
 */
export type ExtractFilteredOnTypeKeys<Base, Condition> = keyof FilteredOnType<Base, Condition>;
/**
 * Get all values from properties with the type of 'Condition'.
 * e.g:
 * type A = ExtractStringValues<{id:number, firstName: string, secondName: string}, string>
 * type A = string
 *
 * This type seems useless, but for Generic function it is be helpful
 */
export type FilteredOnTypeValues<T, P> = Extract<T[ExtractFilteredOnTypeKeys<T, P>], P>;
/**
 * FilterOnType-Types with specific type. Only useful for cleaner code.
 */
// boolean
export type ExtractBoolean<T> = FilteredOnType<T, boolean>;
export type ExtractBooleanKeys<T> = ExtractFilteredOnTypeKeys<T, boolean>;
export type ExtractBooleanValues<T> = FilteredOnTypeValues<T, boolean>;
// number
// string
export type ExtractString<T> = FilteredOnType<T, string>;
export type ExtractStringKeys<T> = ExtractFilteredOnTypeKeys<T, string>;
export type ExtractStringValues<T> = FilteredOnTypeValues<T, string>;
// Date
// ...
