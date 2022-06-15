import { FC, ReactElement } from 'react'

import styled from 'styled-components'
import Zoom from 'react-reveal/Zoom'

const StyledMenu = styled.body`
   display: flex;
   height: calc(100vh - 120px);
   justify-content: space-around;
   align-items: center;
   flex-wrap: wrap;
   gap: .5rem;
`

type PropType = {
   children: ReactElement
}

export const Menu: FC<PropType> = ({ children }) => {
   return (
      <Zoom>
         <StyledMenu>
            { children }
         </StyledMenu>
      </Zoom>
   )
}
