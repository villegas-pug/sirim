export type LevelLog = 'SUCCESS' | 'WARNING' | 'ERROR'

export interface Response<E> {
   levelLog: LevelLog
   data: E
   message: string
}
