import styled from 'styled-components'
import { fontFamily } from 'constants/'
import { FC } from 'react'

interface StyledTypes {
   size?: number
}

interface PropTypes extends StyledTypes {
   title: string
}

const MyDrawerTitle = styled.title<StyledTypes>`
   display: block;
   font-family: ${fontFamily.DRAWERTITLE};
   font-weight: 100;
   font-size: ${({ size }) => size ? `${size}rem` : '1.2rem'};
   color: #777;
   text-align: right;   
`

export const DrawerTitle: FC<PropTypes> = ({ title, ...rest }) => {
   return (
      <MyDrawerTitle
         { ...rest }
      >
         { title }
      </MyDrawerTitle>
   )
}
