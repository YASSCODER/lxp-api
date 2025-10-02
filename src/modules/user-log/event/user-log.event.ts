import { UserLogInterface } from '../types/user-log.interface'

export class UserLogEvent {
  constructor(public readonly userLogData: UserLogInterface) {}
}
