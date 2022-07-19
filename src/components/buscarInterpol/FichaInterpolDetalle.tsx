import { FC } from 'react'

import {
   Card,
   CardHeader,
   Avatar,
   CardContent,
   List,
   ListItem,
   ListItemText,
   ListItemIcon,
   Grid
} from '@mui/material'
import { PersonOutline, ChevronRight } from '@mui/icons-material'

import { Interpol } from 'interfaces'

type Props = {
   data: Interpol
}

export const FichaInterpolDetalle: FC<Props> = ({ data }) => {
   return (
      <>
         <Card sx={{ width: '60rem' }}>
            <CardHeader
               avatar={<Avatar><PersonOutline /></Avatar>}
               title={`${data.nombres}, ${data.apellidos}`}
               subheader={ data.nacionalidad }
            />
            <CardContent>
               <Grid container>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Pasaporte' secondary={ data.pasaporte } />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Cédula' secondary={ data.cedula } />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Nacionalidad' secondary={ data.nacionalidad } />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Sexo' secondary={ data.sexo } />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Fecha Emisión' secondary={ data.fechaEmision } />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Fecha y Lugar de Nacimiento' secondary={ data.fechaLugarNacimiento } />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Motivo' secondary={ data.motivo } />
                        </ListItem>
                     </List>
                  </Grid>
                  <Grid item xs={3} xl={6}>
                     <List>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Procedencia' secondary={ data.procedencia } />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon><ChevronRight /></ListItemIcon>
                           <ListItemText primary='Sede' secondary={ data.sede } />
                        </ListItem>
                     </List>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>

      </>
   )
}
