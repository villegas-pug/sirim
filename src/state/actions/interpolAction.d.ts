import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { Interpol } from 'interfaces'

interface FindInterpolByAprox {
   type: '[Interpol] Find interpol by aprox loading'
}

interface FindInterpolByAproxSuccess {
   type: '[Interpol] Find interpol by aprox success'
   payload: Array<Interpol>
}
interface FindInterpolByAproxError {
   type: '[Interpol] Find interpol by aprox error'
   payload: string | null
}

interface SaveAllInterpolLoading {
   type: '[Interpol] Save all interpol loading'
}

interface SaveAllInterpolSuccess {
   type: '[Interpol] Save all interpol success'
}

interface SaveAllInterpolError {
   type: '[Interpol] Save all interpol error'
   payload: string | null
}

interface SaveInterpolLoading {
   type: '[Interpol] Save interpol loading'
}

interface SaveInterpolSuccess {
   type: '[Interpol] Save interpol success'
}

interface SaveInterpolError {
   type: '[Interpol] Save interpol error'
   payload: string | null
}

interface FindInterpolScreeshotLoading {
   type: '[Interpol] Find screenshot interpol loading'
}

interface FindInterpolScreeshotSuccess {
   type: '[Interpol] Find screenshot interpol success'
}

interface FindInterpolScreeshotError {
   type: '[Interpol] Find screenshot interpol error'
   payload: string | null
}

export type InterpolAction =
   | ResponseHttpStatusType
   | FindInterpolByAprox
   | FindInterpolByAproxSuccess
   | FindInterpolByAproxError
   | SaveAllInterpolLoading
   | SaveAllInterpolSuccess
   | SaveAllInterpolError
   | SaveInterpolLoading
   | SaveInterpolSuccess
   | SaveInterpolError
   | FindInterpolScreeshotLoading
   | FindInterpolScreeshotSuccess
   | FindInterpolScreeshotError
