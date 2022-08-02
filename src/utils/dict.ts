// export type DictKey = string | number

// export type DictAny = Record<DictKey, any>

// export type DictValue<T> = Record<DictKey, T>
// // export type DictArray<T> = Record<DictKey, T[]>

// export const putDictValue = <T>(key: DictKey, value: T, dict: DictValue<T>, overwrite: boolean = false): void => {
//   if (!dict[key] || overwrite) dict[key] = value
// }

// // export const putDictArray = <T>(
// //   key: DictKey,
// //   value: T,
// //   dict: DictArray<T>,
// //   unique: boolean = true,
// //   compare?: (first: T, second: T) => boolean
// // ): boolean => {
// //   // Find existing DICT entries
// //   let entries = dict[key]

// //   // Check if new entry
// //   if (!entries) {
// //     entries = [value]
// //     // eslint-disable-next-line no-param-reassign
// //     dict[key] = entries
// //     // Return TRUE in case of new entry
// //     return true
// //   }

// //   if (unique) {
// //     let found = false
// //     if (compare) {
// //       for (const ent of ents)
// //         if (compare(ent, value)) {
// //           found = true
// //           break
// //         }
// //     } else if (ents.includes(value)) found = true
// //     if (!found) ents.push(value)
// //   } else {
// //     entries.push(value)
// //   }

// //   return false
// // }

// // export const dictMerge = <T>(
// //   target: DictValue<T>,
// //   source: DictValue<T>,
// //   filterCb: (k: DictKey, v: T) => boolean = (_k, v) => (v ? true : false)
// // ): Record<string, any> => {
// //   for (const [k, v] of Object.entries(source)) if (filterCb(k, v)) target[k] = v
// //   return target
// // }
