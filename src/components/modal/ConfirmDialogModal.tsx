import { forwardRef, useState, useImperativeHandle } from 'react'
import {
   Button,
   Dialog,
   DialogActions,
   DialogTitle,
   Typography
} from '@mui/material'

export type ConfirmDialogRefProps = {
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
}

type Props = {
   title: string
   setIsAccept: (isAccept: boolean) => void
}

export const ConfirmDialogModal = forwardRef<ConfirmDialogRefProps, Props>(({ title, setIsAccept }, ref) => {
   /* » HOOK'S  */
   const [isOpen, setIsOpen] = useState(false)

   useImperativeHandle(ref, () => ({
      isOpen,
      setIsOpen
   }), [isOpen])

   /* » HANDLER'S */
   const handleAcceptDialog = () => { setIsAccept(true); setIsOpen(false) }
   const handleCancelDialog = () => { setIsAccept(false); setIsOpen(false) }

   return (
      <>
         <Dialog open={ isOpen } onClose={() => setIsOpen(false)}>
            <DialogTitle>
               <Typography variant='h5'>
                  { title }
               </Typography>
            </DialogTitle>
            <DialogActions>
               <Button onClick={handleAcceptDialog}>Aceptar</Button>
               <Button onClick={handleCancelDialog}>Cancelar</Button>
            </DialogActions>
         </Dialog>
      </>
   )
})
