import { FC, ReactElement } from 'react'

import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'

const MyMenu = styled(motion.body)`
   display: flex;
   height: calc(100vh - 120px);
   justify-content: space-around;
   align-items: center;
   flex-wrap: wrap;
   gap: .5rem;
`

type PropType = {
   children: ReactElement | ReactElement[]
}

export const containerVariants: Variants = {
   hidden: { opacity: 1, scale: 0 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: {
         duration: 1,
         delayChildren: 0.3,
         staggerChildren: 0.3
      }
   }
}

export const itemMenuVariants: Variants = {
   hidden: { y: 30, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1
   }
}

export const Menu: FC<PropType> = ({ children }) => {
   return (
      <MyMenu
         variants={ containerVariants }
         initial='hidden'
         animate='visible'
      >
         { children }
      </MyMenu>
   )
}
