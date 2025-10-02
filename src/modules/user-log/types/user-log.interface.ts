import { LogStatus } from '@/common/enum/logs-status.enum'

export interface UserLogInterface {
  userId: number
  action: string
  timestamp: Date
  status: LogStatus
  ip: string
}
