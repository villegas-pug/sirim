
import { convertBlob } from 'helpers'
import { Interpol } from 'interfaces'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useInterpol = () => {
   /* » STORE-HOOK'S ... */
   const {
      loading: loadingInterpolDb,
      data: interpolDb
   } = useAppSelector(state => state.interpol)
   const {
      findInterpolByApprox,
      saveInterpol,
      saveAllInterpol,
      findInterpolScreenshotById
   } = useAppActions()

   /* » CUSTOM HOOKiS  */
   /* » EFFECT'S  */

   /* » HANDLER'S  */
   const handleSaveInterpol = (values: Partial<Interpol>, files: File[]) => {
      const formData = new FormData()
      formData.append('interpol', convertBlob(values))
      formData.append('file', files[0])
      saveInterpol(formData)
   }

   const handleSaveAllInterpol = (files: File[]) => {
      const formData = new FormData()
      formData.append('file', files[0])
      saveAllInterpol(formData)
   }

   return {
      loadingInterpolDb,
      interpolDb,

      findInterpolByApprox,
      handleSaveInterpol,
      handleSaveAllInterpol,
      findInterpolScreenshotById
   }
}
