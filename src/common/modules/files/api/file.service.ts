import { S3Service } from '@/common/aws/service/s3.service'
import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

@Injectable()
export class FileService {
  constructor(private readonly s3Service: S3Service) {}
  async uploadImage(file: Express.Multer.File) {
    const key = uuid()
    const contentType = file.mimetype

    await this.s3Service.uploadFile(key, file.buffer, contentType)
    const fileName = file.filename || file.originalname || key
    const url = await this.s3Service.generateSignedDownloadUrl(key)

    return {
      key,
      fileName,
      url,
    }
  }
}
