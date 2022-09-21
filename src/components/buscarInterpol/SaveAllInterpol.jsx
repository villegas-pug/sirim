import React, { useState, useEffect, useRef} from 'react'
import {
   Card, 
   CardContent,
   CardMedia,
   CardActions,
   CardActionArea,
   Typography,
   IconButton,
   CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
   Storage,
   AttachFile,
   Publish
} from '@material-ui/icons'
import { Fade } from 'react-reveal'

import useInterpol from 'hooks/useInterpol'

const useStyles = makeStyles({
   root: {
      margin: 'auto',
      maxWidth: 345,
   },
   media: {
      height: 140,
      display: 'flex'
   },
   icon:{
      margin: 'auto',
      fontSize: 150,
      textAlign: 'center',
   }
})

export default function NuevoInterpolSubMod() {

   /*» HOOK'S  */
   const rFile = useRef()
   const classes = useStyles()
   const [file, setFile] = useState(null)
   
   /*» CUSTOM HOOK'S  */
   const { interpolLoadingDb, handleSaveAllInterpol } = useInterpol()

   /*»  EFFECT'S */
   useEffect(() => { !interpolLoadingDb && setFile(null) }, [interpolLoadingDb])

   /*» HANDLER'S  */
   const handleClickAppendFile = () => { rFile.current.click() }
   const handleChangeAppendFile = ({ target: { files } }) => { setFile(files) }

   return (
      <Fade>
         <Card className={classes.root}>
            <CardActionArea>
               <CardMedia
                  className={classes.media}
                  title='Archivo'
               >
                  <Storage color='primary' className={classes.icon} />
               </CardMedia>
               <CardContent>
                  <Typography gutterBottom variant='h4' component='h2'>
                        Hoja de excel Interpol
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                        El archivo adjunto debe estar en formato xlsx.
                  </Typography>
               </CardContent>
            </CardActionArea>
            <CardActions>
               <IconButton
                  size='large' 
                  color='primary'
                  onClick={handleClickAppendFile}
                  disabled={interpolLoadingDb}
               >
                  <AttachFile fontSize='large' />
               </IconButton>
               <IconButton
                  size='large' 
                  color='primary'
                  disabled={!file}
                  onClick={() => {handleSaveAllInterpol(file)}}
               >
                  {
                     interpolLoadingDb
                        ? <CircularProgress size={20} />
                        : <Publish fontSize='large' />
                  } 
               </IconButton>
            </CardActions>
            <input 
               ref={rFile} 
               type='file' 
               accept='.xlsx' 
               onChange={handleChangeAppendFile}
               hidden 
            />
         </Card>
      </Fade>
   )
}