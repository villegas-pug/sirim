import { FC, ReactElement } from 'react'

import { Scrollbars } from 'react-custom-scrollbars-2'

type MyScrollbarsProps = {
   height: number
   children: ReactElement | Array<ReactElement>
}

export const Scrollbar: FC<MyScrollbarsProps> = ({ children, height }) => {
   return (
      <Scrollbars style={{ height: `${height}vh` }}>
         { children }
      </Scrollbars>

   )
}
