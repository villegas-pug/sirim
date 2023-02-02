import { FC, ReactElement } from 'react'

import {
   Paper,
   Grid,
   Typography,
   Avatar,
   IconButton,
   Stack,
   Divider
} from '@mui/material'
import { Visibility } from '@mui/icons-material'
import Fade from 'react-reveal/Fade'

import { makeStyles } from '@mui/styles'

import { elementIcons, IconAppTypes } from 'constants/'
import { applyCommaThousands } from 'helpers'

const useStyle = makeStyles({
   paper: {
      height: 80,
      width: 220
   },
   rootGrid: {
      height: '100%'
   },
   avatar: {
      width: 55,
      height: 55
   }
})

type Props = {
   iconName: IconAppTypes
   title: string
   value: number | string
   handleShowDetail?: () => void
}

type WrapInfoCardProps = {
   children: ReactElement | ReactElement[]
   loading: boolean
}

export const WrapperInfoCard: FC<WrapInfoCardProps> = ({ children, loading }) => {
   return (
      <Fade top>
         <Fade top when={ !loading }>
            <Stack
               mt={ 1 }
               direction='row'
               justifyContent='space-around'
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               { children }
            </Stack>
         </Fade>
      </Fade>
   )
}

export const InfoCard: FC<Props> = ({ iconName, title, value, handleShowDetail }) => {
   /* » HOOK'S ... */
   const classes = useStyle()

   return (
      <>
         <Paper variant='outlined' className={ classes.paper }>
            <Grid container className={ classes.rootGrid }>
               <Grid item container xs={5} justifyContent='center' alignItems='center'>
                  <Avatar className={ classes.avatar }>
                     { elementIcons[iconName] }
                  </Avatar>
               </Grid>
               <Grid item container xs={7}>
                  <Grid item container xs={12} alignItems='flex-end' justifyContent='center'>
                     <Typography variant='h4' color='textSecondary'>{ title }</Typography>
                  </Grid>
                  <Grid item container xs={7} alignItems='center' justifyContent='center'>
                     <Typography variant='h1' color='primary'>{ applyCommaThousands(parseInt(value.toString())) }</Typography>
                  </Grid>
                  <Grid item container xs={5} alignItems='center' justifyContent='center'>
                     <IconButton
                        onClick={ handleShowDetail }
                     >
                        <Visibility />
                     </IconButton>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </>
   )
}
