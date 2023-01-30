import { ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

interface SimpleFieldDetailProps<T> {
  record: T
  title: string
  prop: keyof T
}

export const SimpleFieldDetail = <T extends unknown>({ record, title, prop }: SimpleFieldDetailProps<T>): ReactElement => {
   return (
      <Stack direction='row' gap={ 0.5 }>
         <Typography variant='h4' color='primary'>{ `${title}:` }</Typography>
         <Typography variant='h5'>{ `${record[prop] || '-'}` }</Typography>
      </Stack>
   )
}
