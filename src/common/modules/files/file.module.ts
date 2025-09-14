import { S3Service } from '@/common/aws/service/s3.service'
import { Module } from '@nestjs/common'
import { FileService } from './api/file.service'
import { FileController } from './api/file.controller'

@Module({
  providers: [FileService, S3Service],
  controllers: [FileController],
  exports: [FileService],
})
export class AppFileModule {}
