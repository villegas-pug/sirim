import { FC } from 'react'
import {
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { elementIcons } from 'constants/icons'
import { Procedimiento } from 'interfaces/Procedimiento'
import { itemMenuVariants } from 'components/layout'

const useStyles = makeStyles({
   root: {
      width: 260
   },
   media: {
      margin: 'auto',
      marginTop: 10,
      width: 70,
      height: 70
   }
})

type PropTypes = Procedimiento

export const SimpleCardNavigate: FC<PropTypes> = ({ nombre, descripcion, icono, rutaPrincipal }) => {
   /* » HOOK'S */
   const classes = useStyles()
   const navigate = useNavigate()

   /* » HANDLER'S */
   const handleRedirect = (path: string) => { navigate(path) }

   return (
      <motion.div
         variants={ itemMenuVariants }
      >
         <Card className={classes.root} >
            <CardActionArea onClick={() => handleRedirect(rutaPrincipal)}>
               <CardMedia
                  className={classes.media}
                  title={nombre}
               >
                  {
                     elementIcons[icono]
                  }
               </CardMedia>
               <CardContent>
                  <Typography variant='h4' color='textPrimary'>
                     { nombre.toUpperCase() }
                  </Typography>
                  <Typography variant='h5' color='textSecondary' component='p' align='justify'>
                     { descripcion }
                  </Typography>
               </CardContent>
            </CardActionArea>
            <CardActions>
               <Button
                  size='small'
                  color='primary'
                  variant='text'
                  onClick={() => { handleRedirect(rutaPrincipal) }}
               >
                  <ArrowForward color='action' />
               </Button>
            </CardActions>
         </Card>
      </motion.div>
   )
}
