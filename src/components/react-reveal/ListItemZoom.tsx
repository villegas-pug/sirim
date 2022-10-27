import { FC, ReactElement, useMemo } from 'react'

import Zoom from 'react-reveal/Zoom'

const delayFadeTop: number = 125
const durationFadeTop: number = 500

type ListItemZoomProps = {
   children: ReactElement | ReactElement[]
   i: number
   direction?: 'left' | 'top' | 'right' | 'bottom'
}

export const ListItemZoom: FC<ListItemZoomProps> = ({ children, i, direction = 'clear' }) => {
   /* ► Dep's ... */
   const fadeDirection = useMemo(() => ({ [direction]: true }), [direction])

   return (
      <Zoom big delay={ delayFadeTop * (i + 1) } duration={ durationFadeTop } { ...fadeDirection }>
         { children }
      </Zoom>
   )
}
