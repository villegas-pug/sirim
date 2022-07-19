import { forwardRef, ReactElement, useState, useImperativeHandle, CSSProperties, useEffect } from 'react'
import {
   Modal,
   Backdrop,
   Fade
} from '@mui/material'
import styled from 'styled-components'

const Body = styled.div`
   position: absolute;
   display: inline-block;
   top: 50vh;
   left: 50vw;
   transform: translateY(-50%) translateX(-50%);
   padding: 1rem;
   background-color: #fff;
`

export type SimpleModalRefProps = {
   isOpen: boolean
   setOpen: (isOpen: boolean) => void
}

type PropsType = {
   children: ReactElement | ReactElement[] | Array<any>
   onOpen?: () => void
   onClose?: () => void
   style?: CSSProperties
}

export const SimpleModal = forwardRef<SimpleModalRefProps, PropsType>(({ children, style, onOpen, onClose }, ref) => {
   /* » HOOK'S */
   const [isOpen, setOpen] = useState(false)

   useImperativeHandle(ref, () => ({
      isOpen,
      setOpen
   }), [isOpen])

   /* » EFFECT'S ...  */
   useEffect(() => {
      if (!isOpen) return
      /* ► Instruccion si `onOpen` no es `undefinded` ... */
      if (onOpen) onOpen()
   }, [isOpen])

   /* » HANDLER'S ...  */
   const handleClose = () => {
      if (onClose) onClose()
      /* ► Instrucciones si `onClose` no es `undefinded` ... */
      setOpen(false)
   }

   return (
      <Modal
         open={ isOpen}
         onClose={ handleClose }
         BackdropComponent={ Backdrop }
         BackdropProps={{ timeout: 1000 }}
         closeAfterTransition={ true }
         disableAutoFocus={ true }
         disableEnforceFocus={ true }
         disableRestoreFocus={ true }
      >
         <Fade in={isOpen}>
            <Body style={style}>
               { children }
            </Body>
         </Fade>
      </Modal>
   )
})
