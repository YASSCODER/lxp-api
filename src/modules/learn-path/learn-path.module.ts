import { Module } from '@nestjs/common'
import { LearnPathService } from './api/learn-path.service'
import { LearnPathController } from './api/learn-path.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { S3Service } from '@/common/aws/service/s3.service'
import { PaginationService } from '@/common/pagination/pagination.service'
import { UserLogService } from '../user-log/api/user-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([LearnPath])],
  providers: [LearnPathService, S3Service, PaginationService, UserLogService],
  controllers: [LearnPathController],
  exports: [],
})
export class LearnPathModule {}
