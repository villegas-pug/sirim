
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { httpStatus } from 'constants/httpStatus'

const initialState = {
   status: httpStatus.OK
}

export const httpStatusReducer = (state: typeof initialState = initialState, action: ResponseHttpStatusType): typeof initialState => {
   switch (action.type) {
   case '[http-status] Response status':
      return { status: action.payload }
   default:
      return state
   }
}
