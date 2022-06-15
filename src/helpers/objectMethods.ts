
export const getPropOfObject = <T>(obj: T, prop: keyof T): any => {
   return obj[prop]
}

export const getPropsOfObject = <T>(obj: T, ...props: (keyof T)[]): Partial<T> => {
   let map!: Partial<T>
   props.forEach(key => { map[key] = obj[key] })
   return map
}

export const getArrPropOfObject = <T>(obj: T, key: string): any => {
   return obj[key as keyof T] || []
}
