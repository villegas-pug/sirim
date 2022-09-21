import { useAppSelector } from './useAppSelector'

export const useHttpStatus = () => {
   /* » STORE  */
   const { status } = useAppSelector(store => store.httpStatus)

   return {
      status
   }
}
