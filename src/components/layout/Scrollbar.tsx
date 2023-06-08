import { FC, ReactElement } from 'react'

import { Scrollbars } from 'react-custom-scrollbars-2'

type MyScrollbarsProps = {
   children: ReactElement | Array<ReactElement>
}

export const Scrollbar: FC<MyScrollbarsProps> = ({ children }) => {
   return (
      <Scrollbars style={{ height: '91%' }}>
         { children }
      </Scrollbars>

   )
}
