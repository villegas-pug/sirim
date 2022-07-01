import { MetaCampoTablaDinamica } from 'interfaces'

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

type MetaType = 'bit' | 'date' | 'int' | 'varchar'

export const convertMetaTypeToSqlType = ({ nombre, tipo }: MetaCampoTablaDinamica): MetaCampoTablaDinamica => {
   switch (tipo as MetaType) {
   case 'varchar':
      return { nombre, tipo: 'VARCHAR(MAX)' }
   default:
      return {} as MetaCampoTablaDinamica
   }
}
