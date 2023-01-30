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

type MetaType = 'bit' | 'date' | 'datetime' | 'int' | 'varchar'

/* ► Method: Para tipos devueltos por la base de datos ... */
export const convertMetaTypeToSqlType = ({ nombre, tipo, info = '' }: MetaCampoTablaDinamica): Partial<MetaCampoTablaDinamica> => {
   switch (tipo as MetaType) {
   case 'varchar':
   case 'bit':
   case 'date':
   case 'datetime':
      return { nombre, tipo: 'VARCHAR(MAX)', info }
   default:
      return { nombre, tipo: 'VARCHAR(MAX)', info }
   }
}

export const resetObjectProps = <T extends { [key: string]: any }>(object: T): T => {
   const entries = Object.entries(object)
   entries.forEach(entry => { entry[1] = '' })
   return Object.fromEntries(entries) as T
}
