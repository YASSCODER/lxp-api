import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { MAX_FILE_SIZE } from '@/common/config/constant/application.constant'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { UserRole } from '@/common/enum/user-role.enum'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async uploadSkillImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throwFormValidationError({
        errorCode: ErrorCodes.FILE_REQUIRED,
        file: {
          en: 'File is required',
          ar: 'الملف مطلوب',
        },
      })
    }

    if (file.size > MAX_FILE_SIZE) {
      throwFormValidationError({
        errorCode: ErrorCodes.FILE_SIZE_EXCEEDED,
        file: {
          en: 'File size should not exceed 25MB',
          ar: 'حجم الملف لا يجب أن يتجاوز 25 ميجابايت',
        },
      })
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throwFormValidationError({
        errorCode: ErrorCodes.FILE_TYPE_NOT_ALLOWED,
        file: {
          en: 'File type not allowed',
          ar: 'نوع الملف غير مسموح',
        },
      })
    }
    return await this.fileService.uploadImage(file)
  }
}
