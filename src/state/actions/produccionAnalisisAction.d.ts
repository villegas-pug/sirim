import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { RptProduccionHoraLaboralDto, RptTiempoPromedioAnalisisDto } from 'interfaces'

interface GetRptTiempoPromedioAnalisisByParmsLoading {
   type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms loading'
}

interface GetRptTiempoPromedioAnalisisByParmsSuccess {
   type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms success'
   payload: RptTiempoPromedioAnalisisDto[]
}

interface GetRptTiempoPromedioAnalisisByParmsError {
   type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms error'
   payload: string | null
}

interface GetRptProduccionHorasLaboralesPorAnalistaLoading {
   type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista loading'
}

interface GetRptProduccionHorasLaboralesPorAnalistaSuccess {
   type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista success'
   payload: RptProduccionHoraLaboralDto[]
}

interface GetRptProduccionHorasLaboralesPorAnalistaError {
   type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista error'
   payload: string | null
}

export type ProduccionAnalisisAction =
| ResponseHttpStatusType
| GetRptTiempoPromedioAnalisisByParmsLoading
| GetRptTiempoPromedioAnalisisByParmsSuccess
| GetRptTiempoPromedioAnalisisByParmsError
| GetRptProduccionHorasLaboralesPorAnalistaLoading
| GetRptProduccionHorasLaboralesPorAnalistaSuccess
| GetRptProduccionHorasLaboralesPorAnalistaError
