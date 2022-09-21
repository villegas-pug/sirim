import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from 'state/action-creators'

export const useAppActions = () => {
   const dispatch = useDispatch()
   return bindActionCreators(actionCreators, dispatch)
}
