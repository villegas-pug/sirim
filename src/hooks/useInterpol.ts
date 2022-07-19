import { useSelector, useDispatch } from 'react-redux'
import {
   obtenerInterpolApprox,
   obtenerInterpol,
   saveOnInterpol,
   saveAllInterpol,
   getScreenshot
} from 'redux/actions/interpolAction'

import convertBlob from 'helpers/blob'

export default function useInterpol () {
   /* » STORE ...  */
   const {
      interpol: {
         loading: interpolLoadingDb,
         error: errorInterpolDb,
         data: interpolDb
      }
   } = useSelector(store => store)
   const dispatch = useDispatch()

   /* » CUSTOM HOOKiS  */
   /* » EFFECT'S  */

   /* » HANDLER'S  */
   const handleFindByApprox = (payload) => { dispatch(obtenerInterpolApprox(payload)) }
   const handleFindAll = () => { dispatch(obtenerInterpol()) }
   const handleSaveOneInterpol = (values, files) => {
      const formData = new FormData()
      formData.append('interpol', convertBlob(values))
      formData.append('file', files[0])
      dispatch(saveOnInterpol(formData))
   }

   const handleSaveAllInterpol = (files) => {
      const formData = new FormData()
      formData.append('file', files[0])
      dispatch(saveAllInterpol(formData))
   }

   const handleDownloadScreenshot = (idInterpol) => { dispatch(getScreenshot(idInterpol)) }

   return {
      interpolLoadingDb,
      interpolDb,
      errorInterpolDb,

      handleFindAll,
      handleFindByApprox,
      handleSaveOneInterpol,
      handleSaveAllInterpol,
      handleDownloadScreenshot
   }
}
