import { useCallback, useEffect, useState } from 'react'

import { useExtraccion } from 'hooks'

import { parseJsonDateToDate } from 'helpers'
import { ProduccionDiaria } from 'interfaces'

export const useRptProduccionDiario = () => {
   // ► HOOK'S ...
   const [produccionAnalisis, setProduccionAnalisis] = useState<ProduccionDiaria[]>([])
   const [produccionDepuracion, setProduccionDepuracion] = useState<ProduccionDiaria[]>([])

   // ► CUSTOM - HOOK'S ...
   const { extraccionDb, findAllTablaDinamica } = useExtraccion()

   // ► EFFECT'S ...
   useEffect(() => { findAllTablaDinamica() }, [])

   // ► DEP'S ...
   const findProduccionDiariaByDateParams = useCallback((fecIni: string, fecFin: string) => {
      // ► Deps ...
      const prodDb: ProduccionDiaria[] = []
      const groupByUsrProdDb: ProduccionDiaria[] = []

      // ► ...
      extraccionDb.forEach(t => {
         t.lstGrupoCamposAnalisis.forEach(g => {
            g.asigGrupoCamposAnalisis.forEach(asig => {
               // ► ...
               prodDb.push({
                  usrAnalista: asig.usrAnalista.nombres,
                  grupo: asig.usrAnalista.grupo,
                  totalAnalizados: asig.produccionAnalisis.filter(p => {
                     const fecProd = parseJsonDateToDate(p.fechaFin)
                     return fecProd >= parseJsonDateToDate(fecIni) && fecProd <= parseJsonDateToDate(fecFin)
                  }).length
               })
            })
         })
      })

      // ► Suministro:
      prodDb.forEach(({ usrAnalista, ...restProd }) => {
         // ► ...
         const iUsrProd = groupByUsrProdDb.findIndex(p => usrAnalista === p.usrAnalista)

         // ► ...
         if (iUsrProd < 0) {
            groupByUsrProdDb.push({ usrAnalista, ...restProd })
         } else {
            groupByUsrProdDb.splice(iUsrProd, 1, {
               ...groupByUsrProdDb[iUsrProd],
               totalAnalizados: groupByUsrProdDb[iUsrProd].totalAnalizados + restProd.totalAnalizados
            })
         }
      })

      // ► Final ...
      setProduccionAnalisis(groupByUsrProdDb.filter(p => p.grupo === 'ANALISIS')
         .sort((prev, next) => prev.totalAnalizados < next.totalAnalizados ? 1 : -1)
      )
      setProduccionDepuracion(groupByUsrProdDb.filter(p => p.grupo === 'DEPURACION')
         .sort((prev, next) => prev.totalAnalizados < next.totalAnalizados ? 1 : -1)
      )
   }, [extraccionDb])

   const totalProduccionAnalisis = produccionAnalisis.reduce((acc, curr) => acc + curr.totalAnalizados, 0)
   const totalProduccionDepuracion = produccionDepuracion.reduce((acc, curr) => acc + curr.totalAnalizados, 0)

   return {
      produccionAnalisis,
      produccionDepuracion,
      totalProduccionAnalisis,
      totalProduccionDepuracion,

      findProduccionDiariaByDateParams,
      findAllTablaDinamica
   }
}
