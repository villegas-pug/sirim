import {
   Backdrop,
   SpeedDial,
   SpeedDialIcon,
   SpeedDialAction,
   SpeedDialProps
} from '@mui/material'
import { styled } from '@mui/styles'
import { FC, ReactElement, useState } from 'react'

const CustomSpeedDial = styled(SpeedDial)({
   position: 'fixed',
   right: 10,
   bottom: 10
})

export type SpeedDialActionProps = {
   name: string
   icon: ReactElement
   handleClick: () => void
}

interface SpeedDialBackdropProps extends Partial<SpeedDialProps> {
   actions: Array<SpeedDialActionProps>
}

export const SpeedDialBackdrop: FC<SpeedDialBackdropProps> = ({ actions, ...rest }) => {
   /* » HOOK'S  */
   const [open, setOpen] = useState(false)

   /* » HANDLRE'S  */
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   return (
      <>
         <Backdrop sx={{ zIndex: 100 }} open={open} />
         <CustomSpeedDial
            ariaLabel="SpeedDial tooltip example"
            icon={ <SpeedDialIcon /> }
            onClose={ handleClose }
            onOpen={ handleOpen }
            open={ open }
            { ...rest }
         >
            {
               actions.map(({ name, icon, handleClick }) => (
                  <SpeedDialAction
                     key={ name }
                     icon={ icon }
                     tooltipTitle={ name }
                     tooltipOpen
                     onClick={() => { handleClick(); handleClose() }}
                  />
               ))
            }
         </CustomSpeedDial>
      </>
   )
}
