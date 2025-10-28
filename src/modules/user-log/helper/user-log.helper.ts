import { UserLogInterface } from '../types/user-log.interface'
import { LogStatus } from '@/common/enum/logs-status.enum'

export function createUserLogData(
  userId: number,
  action: string,
  status: LogStatus,
  ip?: string,
): UserLogInterface {
  return {
    userId,
    action,
    timestamp: new Date(),
    status,
    ip,
  }
}

export function applyUserLogFilter() {}
