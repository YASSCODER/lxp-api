import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { SkillService } from './skill.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Roles } from '@/auth/decorators/roles.decorator'
import { UserRole } from '@/common/enum/user-role.enum'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { FetchSkillDto } from '../dto/fetch-skill.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { MAX_FILE_SIZE } from '@/common/config/constant/application.constant'

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createSkill(@Body() payload: CreateSkillDto) {
    return await this.skillService.createSkill(payload)
  }

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
    return await this.skillService.uploadImage(file)
  }

  @Get('paginate')
  async listAllSkills(@Query() payload: FetchSkillDto) {
    return await this.skillService.listAllSkillsWithPagination(payload)
  }
}
