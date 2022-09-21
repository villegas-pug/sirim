import { useState, useEffect } from 'react'
import { breakpoints, screens, Screens } from 'constants/breakpoints'

const findScreen = (outerWidth: number): Screens =>
   breakpoints.find(({ measure }) => outerWidth >= measure)?.name || '' as Screens

export const useBreakpoints = () => {
   const [currentScreen, setCurrentScreen] = useState(findScreen(window.screen.width))

   /* ► EFFECT'S ... */
   useEffect(() => { window.addEventListener('resize', findScreenByBreakPoint) }, [])
   useEffect(() => { setCurrentScreen(findScreen(window.outerWidth)) }, [])

   // ► Clean-up ...
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])

   /* ► HANDLER'S ... */
   const unsuscribeScreenResizeListener = () => { window.removeEventListener('resize', findScreenByBreakPoint) }

   const findScreenByBreakPoint = ({ target }: UIEvent) => {
      const { outerWidth } = target as Window
      setCurrentScreen(findScreen(outerWidth))
   }

   return {
      currentScreen,
      screens
   }
}
