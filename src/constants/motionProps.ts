import { Variants } from 'framer-motion'

export const variantsParent: Variants = {
   hidden: { scale: 0, opacity: 1 },
   visible: {
      scale: 1,
      opacity: 1,
      transition: {
         delayChildren: 0.3,
         staggerChildren: 1
      }
   }
}

export const variantsChild: Variants = {
   hidden: { y: -20, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.5
      }
   }
}
