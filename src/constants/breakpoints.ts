/*
   » Pantalla de 19 pulgadas (relación estándar): 1280 x 1024 píxeles
   » Pantalla de 20 pulgadas (relación estándar): 1600 x 1200 píxeles
   » Pantalla de 22 pulgadas (pantalla panorámica): 1680 x 1050 píxeles
   » Pantalla de 24 pulgadas (pantalla panorámica): 1900 x 1200 píxeles
*/
// -------------------------------------------------------------------------------------------------------------
export type Screens = 'mobile' | 'mobileLandscape' | 'tablet' | 'tabletLandscape' | 'desktop' | 'desktopLarge' | 'desktopWide'
type Breakpoint = { name: Screens, measure: number }

export const breakpoints: Array<Breakpoint> = [
   { name: 'desktopWide', measure: 1800 },
   { name: 'desktopLarge', measure: 1500 },
   { name: 'desktop', measure: 1200 },
   { name: 'tabletLandscape', measure: 1024 },
   /* { name: 'tablet', measure: 768 }, */
   { name: 'mobileLandscape', measure: 480 },
   { name: 'mobile', measure: 320 }
]

export const screens: Record<Screens, string> = breakpoints.reduce((map: any, { name }) => (map[name] = name, map), {})
