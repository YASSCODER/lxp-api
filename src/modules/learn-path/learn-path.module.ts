import { Module } from '@nestjs/common'
import { LearnPathService } from './api/learn-path.service'
import { LearnPathController } from './api/learn-path.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { S3Service } from '@/common/aws/service/s3.service'

@Module({
  imports: [TypeOrmModule.forFeature([LearnPath])],
  providers: [LearnPathService, S3Service],
  controllers: [LearnPathController],
  exports: [],
})
export class LearnPathModule {}
