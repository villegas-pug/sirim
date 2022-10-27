import { FC, ReactElement, useMemo } from 'react'

import Fade from 'react-reveal/Fade'

const delayFadeTop: number = 125
const durationFadeTop: number = 500

type ListItemFadeProps = {
   children: ReactElement | ReactElement[]
   i: number
   direction: 'left' | 'top' | 'right' | 'bottom'
}

export const ListItemFade: FC<ListItemFadeProps> = ({ children, i, direction }) => {
   /* ► Dep's ... */
   const fadeDirection = useMemo(() => ({ [direction]: true }), [direction])

   return (
      <Fade big delay={ delayFadeTop * (i + 1) } duration={ durationFadeTop } { ...fadeDirection }>
         { children }
      </Fade>
   )
}
