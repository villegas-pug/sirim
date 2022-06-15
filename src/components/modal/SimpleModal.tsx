import { forwardRef, ReactElement, useState, useImperativeHandle, CSSProperties } from 'react'
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
   children: ReactElement | Array<ReactElement>
   style?: CSSProperties
}

export const SimpleModal = forwardRef<SimpleModalRefProps, PropsType>(({ children, style }, ref) => {
   /* » HOOK'S */
   const [isOpen, setOpen] = useState(false)

   useImperativeHandle(ref, () => ({
      isOpen,
      setOpen
   }), [isOpen])

   return (
      <Modal
         open={isOpen}
         onClose={() => setOpen(false)}
         BackdropComponent={Backdrop}
         BackdropProps={{ timeout: 1000 }}
         closeAfterTransition={true}
         disableAutoFocus={true}
         disableEnforceFocus={true}
         disableRestoreFocus={true}
      >
         <Fade in={isOpen}>
            <Body style={style}>
               { children }
            </Body>
         </Fade>
      </Modal>
   )
})
