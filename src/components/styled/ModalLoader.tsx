import { FC } from 'react'
import ReactDOM from 'react-dom'

/* import Fade from 'react-reveal/Fade' */
import styled from 'styled-components'
import { PropagateLoader } from 'react-spinners'

const Modal = styled.body`
   position: fixed;
   inset: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, .15);
   opacity: 0;
   z-index: 9999;

   animation: show 1s ease forwards;

   @keyframes show {
      to{ opacity: 1; }
   }
   
`

export const ModalLoader: FC = () => {
   /* ► ...  */
   const portal = document.getElementById('loader')

   return ReactDOM.createPortal(
      <Modal>
         <PropagateLoader color='#004795' size={ 25 } />
      </Modal>,
      portal!
   )
}
