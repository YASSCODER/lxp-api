import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'

@Injectable()
export class S3Service {
  private s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  private bucketName = process.env.AWS_BUCKET_NAME!
  private prefix = (process.env.AWS_PREFIX || '').replace(/^\/+|\/+$/g, '')
  private withPrefix(key: string) {
    return this.prefix ? `${this.prefix}/${key.replace(/^\/+/, '')}` : key
  }

  async generateSignedUploadUrl(fileName: string): Promise<string> {
    const Key = this.withPrefix(fileName)
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key,
    })
    return getSignedUrl(this.s3Client, command, {
      expiresIn: Number(process.env.AWS_UPLOAD_URL_EXPIRES_IN) || 600,
    })
  }

  async uploadFile(key: string, fileBuffer: Buffer, contentType: string) {
    const Key = this.withPrefix(key)

    const res = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key,
        Body: fileBuffer,
        ContentType: contentType,
      }),
    )
    if (res.$metadata.httpStatusCode && res.$metadata.httpStatusCode >= 300) {
      throw new Error('Failed to upload file to S3')
    }
  }

  async generateSignedDownloadUrl(key: string): Promise<string> {
    const Key = this.withPrefix(key)
    const cmd = new GetObjectCommand({
      Bucket: this.bucketName,
      Key,
    })
    return getSignedUrl(this.s3Client, cmd, {
      expiresIn: Number(process.env.AWS_DOWNLOAD_URL_EXPIRES_IN) || 600,
    })
  }

  async generatePublicUrl(key: string): Promise<string> {
    const Key = this.withPrefix(key)
    const cmd = new GetObjectCommand({
      Bucket: this.bucketName,
      Key,
    })
    return getSignedUrl(this.s3Client, cmd, {
      expiresIn: Number(process.env.AWS_DOWNLOAD_URL_EXPIRES_IN) || 600,
    })
  }
}
