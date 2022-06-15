import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { StateType } from 'state/store'

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
