import { HttpStatus, HttpException } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throwFormValidationError = (errors: any) => {
  const errorResponse = {
    message: 'Form submission in invalid',
    errors: {
      ...errors,
    },
  }
  throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST)
}

export const throwPopupValidationError = (error: { message: string }) => {
  const errorResponse = {
    message: 'Form submission in invalid',

    error: error,
  }
  throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST)
}

export const throwAuthorizationValidationError = (error: {
  message: {
    [key: string]: string
  }
}) => {
  const errorResponse = {
    message: 'Not Authorized',
    errors: error,
  }
  throw new UnauthorizedException(errorResponse)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throwForbiddenError = (errors: any) => {
  const errorResponse = {
    message: 'Form submission in invalid',
    errors: {
      ...errors,
    },
  }

  throw new HttpException(errorResponse, HttpStatus.FORBIDDEN)
}
