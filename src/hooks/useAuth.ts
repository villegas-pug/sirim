import { useEffect, useMemo, useState } from 'react'

import { httpStatus } from 'constants/'

import { useAppActions, useAppSelector, useHttpStatus } from 'hooks'
import { Procedimiento } from 'interfaces'
import { Modulo } from 'types'

export const componentsType = {
   MODULO: 'MODULO',
   SUB_MODULO: 'SUB_MODULO',
   ITEM: 'ITEM',
   SUB_ITEM: 'SUB_ITEM'
}

const { MODULO, SUB_ITEM, ITEM } = componentsType

export const useAuth = () => {
   /* » STORE-HOOK'S  */
   const {
      loading: authLoading,
      token,
      userCredentials,
      users: {
         data: usersDb
      }
   } = useAppSelector(state => state.usuario)
   const {
      findAllUser,
      findUserByLogin,
      login,
      logout,
      updateAccount
   } = useAppActions()

   // » HOOK'S...
   const [componentsAuth, setComponentsAuth] = useState<Procedimiento[]>([])
   const [redirectComponentsAuth, setRedirectComponentsAuth] = useState<Procedimiento[]>([])
   const [modAuthenticated, setModAuthenticated] = useState<Procedimiento[]>([])
   const [submodAuthenticated, setSubmodAuthenticated] = useState({} as Record<Modulo, Array<any>>)
   const [pathAuthenticated, setPathAuthenticated] = useState({})
   const { status } = useHttpStatus()

   // » EFFECT'S ...
   useEffect(() => { status === httpStatus.FORBIDDEN && logout() }, [status])

   useEffect(() => {
      let procedimiento: Procedimiento[] | any = []
      if (Object.keys(userCredentials).length) { procedimiento = userCredentials?.usrProcedimiento?.map(({ procedimiento }) => procedimiento) }

      setComponentsAuth(procedimiento)
   }, [userCredentials])

   useEffect(() => {
      let redirectComponentsAuth: Procedimiento[] | any = []
      if (componentsAuth.length) {
         redirectComponentsAuth = componentsAuth
            .filter(({ tipo }) => tipo !== ITEM && tipo !== SUB_ITEM)
            .map((procedimiento) => procedimiento)
      }

      setRedirectComponentsAuth(redirectComponentsAuth)
   }, [componentsAuth])

   useEffect(() => {
      let pathAuthenticated: any = {}
      pathAuthenticated = componentsAuth?.reduce((map: any, { nombre, rutaPrincipal }) => (map[nombre] = rutaPrincipal, map), {})
      setPathAuthenticated(pathAuthenticated)
   }, [componentsAuth])

   useEffect(() => {
      setModAuthenticated(componentsAuth?.filter(({ tipo }) => tipo === MODULO))
   }, [componentsAuth])

   useEffect(() => {
      const submod: any = {}
      modAuthenticated?.forEach(({ nombre: nombreMod, rutaMod: rutaModOfMap }) => {
         componentsAuth
            .filter(({ tipo }) => tipo === componentsType.SUB_MODULO)
            .filter(({ rutaMod }) => rutaModOfMap === rutaMod)
            .forEach((record) => {
               submod[nombreMod] = typeof (submod[nombreMod]) !== 'undefined'
                  ? [...submod[nombreMod], record]
                  : [record]
            })
      })
      setSubmodAuthenticated(submod)
   }, [modAuthenticated])

   // » HANDLER'S ...

   // » DEP'S ...
   /* const usersAnalisisDb = useMemo(() => usersDb.filter(({ grupo, activo }) => grupo === 'ANALISIS' && activo), [usersDb])
   const usersDepuracionDb = useMemo(() => usersDb.filter(({ grupo, activo }) => grupo === 'DEPURACION' && activo), [usersDb]) */
   const userscurrentGroupDb = useMemo(() => {
      // ► Validación: ...
      if (usersDb.length === 0) return []

      return usersDb.filter(({ grupo, activo }) => grupo === userCredentials.grupo && activo)
   }, [usersDb])

   return {
      usersDb,
      isAuthenticated: Boolean(Object.entries(userCredentials).length),
      token,
      authLoading,
      userCredentials,

      componentsAuth,
      redirectComponentsAuth, // » Components that rendered other components as MOD and SUB_MOD ...
      modAuthenticated,
      submodAuthenticated,
      pathAuthenticated,
      userscurrentGroupDb,

      findAllUser,
      findUserByLogin,
      updateAccount,
      login,
      logout
   }
}
