import { createStore, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from 'state/reducers/rootReducer'

export const store = createStore<any, any, any, any>(
   rootReducer,
   compose(
      applyMiddleware(thunk),
      devToolsEnhancer({})
   )
)

export type AppState = ReturnType<typeof rootReducer>
