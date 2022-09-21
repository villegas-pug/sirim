import { forwardRef, ReactElement, useState, useImperativeHandle, CSSProperties, useEffect } from 'react'
import {
   Modal,
   Backdrop,
   Box,
   IconButton
} from '@mui/material'
import { CancelRounded } from '@mui/icons-material'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Body = styled.div`
   position: absolute;
   display: inline-block;
   top: 50vh;
   left: 50vw;
   transform: translateY(-50%) translateX(-50%);
   padding: .5rem;
   background-color: #fff;
   cursor: grab;

   :active {
      cursor: grabbing;
   }
`

export type SimpleModalRefProps = {
   isOpen: boolean
   setOpen: (isOpen: boolean) => void
}

type Props = {
   children: ReactElement | ReactElement[] | Array<any>
   onOpen?: () => void
   onClose?: () => void
   style?: CSSProperties
}

export const SimpleModal = forwardRef<SimpleModalRefProps, Props>(({ children, style, onOpen, onClose }, ref) => {
   /* » HOOK'S ... */
   const [isOpen, setOpen] = useState(false)

   useImperativeHandle(ref, () => ({
      isOpen,
      setOpen
   }), [isOpen])

   /* » EFFECT'S ...  */
   useEffect(() => {
      if (!isOpen) return /* ► Si `onOpen` es `undefinded`, interrumpe la ejecución ... */
      if (onOpen) onOpen()
   }, [isOpen])

   /* » HANDLER'S ...  */
   const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'backdropClick') return
      if (onClose) onClose()
      setOpen(false)
   }

   return (
      <Modal
         open={ isOpen}
         onClose={ handleClose }
         BackdropComponent={ Backdrop }
         BackdropProps={{ timeout: 1000 }}
         closeAfterTransition={ true }
      >
         <motion.div
            drag
            dragElastic={ 1 }
         >
            <Body style={ style }>
               <Box display='flex'>

                  <IconButton
                     sx={{ ml: 'auto', mb: 1 }}
                     onClick={ () => { setOpen(false) } }
                  >
                     <CancelRounded
                        color='error'
                     />
                  </IconButton>
               </Box>

               {/* ► Render prop's ...  */}
               { children }
            </Body>
         </motion.div>
      </Modal>
   )
})
