import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  PayloadTooLargeException,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { formatErrorResponse } from '../utils/filter-throw-exception-error'
import { ENTITY_NAME_DICTIONARY } from '../dictionary/entity-names.dictionary'

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception instanceof Error ? exception.message : exception,
    }

    if (exception instanceof PayloadTooLargeException) {
      return response.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
        errorCode: ErrorCodes.FILE_SIZE_EXCEEDED,
        file: {
          en: 'File size should not exceed 10MB',
          ar: 'حجم الملف لا يجب أن يتجاوز 10 ميجابايت',
        },
        path: request.url,
        timestamp: new Date().toISOString(),
      })
    }

    if (exception instanceof QueryFailedError) {
      this.logger.error('🔍 Database Query Failed:', {
        message: exception.message,
        query: exception.query,
        parameters: exception.parameters,
        driverError: exception.driverError,
      })

      const driverError = exception.driverError
      if (driverError && driverError.code === '23505') {
        const constraint = driverError.constraint
        const table = driverError.table
        const column = driverError.column
        const detail = driverError.detail

        this.logger.error('🔍 Unique Constraint Violation Details:', {
          constraint,
          table,
          column,
          detail,
        })

        let fieldName = 'unknown'
        let entityType = 'unknown'
        let errorCode = ErrorCodes.DUPLICATE_EMAIL

        if (constraint) {
          const constraintLower = constraint.toLowerCase()
          if (
            constraintLower.includes('user') ||
            constraintLower.includes('email') ||
            constraintLower.includes('phone')
          ) {
            entityType = 'User'
            if (constraintLower.includes('email')) {
              fieldName = 'email'
              errorCode = ErrorCodes.DUPLICATE_EMAIL
            } else if (constraintLower.includes('phone')) {
              fieldName = 'phone'
              errorCode = ErrorCodes.PHONE_EXISTS
            }
          } else if (constraintLower.includes('contractor')) {
            entityType = 'Contractor'
            if (constraintLower.includes('email')) {
              fieldName = 'email'
              errorCode = ErrorCodes.EMAIL_EXISTS
            } else if (constraintLower.includes('phone')) {
              fieldName = 'phone'
              errorCode = ErrorCodes.PHONE_EXISTS
            }
          } else if (constraintLower.includes('supplier')) {
            entityType = 'Supplier'
            if (constraintLower.includes('email')) {
              fieldName = 'email'
              errorCode = ErrorCodes.EMAIL_EXISTS
            } else if (constraintLower.includes('phone')) {
              fieldName = 'phone'
              errorCode = ErrorCodes.PHONE_EXISTS
            }
          }
        }

        if (fieldName === 'unknown' && detail) {
          const detailMatch = detail.match(
            /Key \((.*?)\)=\(.*?\) already exists/,
          )
          if (detailMatch) {
            const columnName = detailMatch[1]
            if (table === 'contractor') {
              entityType = 'Contractor'
              if (columnName === 'email') {
                fieldName = 'email'
                errorCode = ErrorCodes.EMAIL_EXISTS
              } else if (columnName === 'phone') {
                fieldName = 'phone'
                errorCode = ErrorCodes.PHONE_EXISTS
              }
            } else if (table === 'supplier') {
              entityType = 'Supplier'
              if (columnName === 'email') {
                fieldName = 'email'
                errorCode = ErrorCodes.EMAIL_EXISTS
              } else if (columnName === 'phone') {
                fieldName = 'phone'
                errorCode = ErrorCodes.PHONE_EXISTS
              }
            } else if (table === 'user') {
              entityType = 'User'
              if (columnName === 'email') {
                fieldName = 'email'
                errorCode = ErrorCodes.DUPLICATE_EMAIL
              } else if (columnName === 'phone') {
                fieldName = 'phone'
                errorCode = ErrorCodes.PHONE_EXISTS
              }
            }
          }
        }

        return response.status(status).json({
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
          message: 'Database constraint violation',
          detail: `${entityType} ${fieldName} already exists`,
          constraint: constraint,
          table: table,
          column: column,
          errorCode: errorCode,
        })
      }

      return response.status(status).json({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
        message: 'Database query failed',
        detail: exception.message,
      })
    } else if (exception instanceof EntityNotFoundError) {
      return this.handleEntityNotFoundError(exception, request, response)
    }

    if (
      exception instanceof HttpException &&
      exception.getStatus() === HttpStatus.BAD_REQUEST
    ) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse())
    }

    if (exception instanceof BadRequestException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse())
    }

    if (exception instanceof UnauthorizedException) {
      return response.status(status).json(exception.getResponse())
    }

    if (exception instanceof EntityNotFoundError) {
      throw exception
    }

    this.logger.error(`Unhandled Exception`, { exception, status })

    this.logger.error(
      `Unhandled Exception: ${JSON.stringify(errorResponse)}`,
      exception instanceof Error ? exception.stack : '',
    )

    response.status(status).json(errorResponse)
  }

  private handleEntityNotFoundError(
    exception: EntityNotFoundError,
    request: Request,
    response: Response,
  ) {
    let rawEntity = 'Entity'

    if (exception?.message) {
      const match = exception.message.match(/entity of type "(.*?)"/)
      if (match?.[1]) {
        rawEntity = match[1].split('.')[1]?.replace(/Entity$/, '') || match[1]
      }
    }

    const readable = ENTITY_NAME_DICTIONARY[rawEntity] ||
      ENTITY_NAME_DICTIONARY['Entity'] || { en: 'Entity', ar: 'كيان' }

    const errorResponse = {
      errorCode: ErrorCodes.ENTITY_NOT_FOUND,
      message: {
        en: `${readable.en} not found`,
        ar: `${readable.ar} غير موجود`,
      },
      path: request.url,
      timestamp: new Date().toISOString(),
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json(formatErrorResponse(errorResponse))
  }
}
