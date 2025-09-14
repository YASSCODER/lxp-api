import { HttpStatus } from '@nestjs/common'
import { ENTITY_NAME_DICTIONARY } from '../dictionary/entity-names.dictionary'

export interface SuccessMessageResponse {
  status: HttpStatus
  message: {
    en: string
    ar: string
  }
}

export interface SuccessMessageOptions {
  entityName?: string
  entityId?: string | number
  customEntityName?: {
    en: string
    ar: string
  }
}

/**
 * Creates success messages for CRUD operations in both English and Arabic
 * @param operation - The operation type: 'create', 'update', or 'delete'
 * @param options - Optional configuration for entity name and ID
 * @returns Success message response with status and bilingual messages
 */
export function getSuccessMessage(
  operation: 'create' | 'update' | 'delete',
  options: SuccessMessageOptions = {},
): SuccessMessageResponse {
  const { entityName, entityId, customEntityName } = options

  
  const entityNames =
    customEntityName ||
    (entityName
      ? ENTITY_NAME_DICTIONARY[entityName.toLowerCase()]
      : { en: 'Item', ar: 'عنصر' })

  const entityNameEn =
    entityNames?.en?.toLowerCase() || entityName?.toLowerCase() || 'item'
  const entityNameAr = entityNames?.ar || entityName || 'عنصر'

  const idSuffix = entityId ? ` with ID: ${entityId}` : ''
  const idSuffixAr = entityId ? ` بالمعرّف: ${entityId}` : ''

  switch (operation) {
    case 'create':
      return {
        status: HttpStatus.CREATED,
        message: {
          en: `${entityNameEn} created successfully${idSuffix}`,
          ar: `تم إنشاء ${entityNameAr} بنجاح${idSuffixAr}`,
        },
      }

    case 'update':
      return {
        status: HttpStatus.OK,
        message: {
          en: `${entityNameEn} updated successfully${idSuffix}`,
          ar: `تم تحديث ${entityNameAr} بنجاح${idSuffixAr}`,
        },
      }

    case 'delete':
      return {
        status: HttpStatus.OK,
        message: {
          en: `${entityNameEn} deleted successfully${idSuffix}`,
          ar: `تم حذف ${entityNameAr} بنجاح${idSuffixAr}`,
        },
      }

    default:
      return {
        status: HttpStatus.OK,
        message: {
          en: 'Operation completed successfully',
          ar: 'تم إنجاز العملية بنجاح',
        },
      }
  }
}

/**
 * Convenience functions for specific operations
 */
export const getCreateSuccessMessage = (options?: SuccessMessageOptions) =>
  getSuccessMessage('create', options)

export const getUpdateSuccessMessage = (options?: SuccessMessageOptions) =>
  getSuccessMessage('update', options)

export const getDeleteSuccessMessage = (options?: SuccessMessageOptions) =>
  getSuccessMessage('delete', options)

/**
 * Generic success message for any operation
 */
export function getGenericSuccessMessage(
  message: string,
  arabicMessage: string,
  status: HttpStatus = HttpStatus.OK,
): SuccessMessageResponse {
  return {
    status,
    message: {
      en: message,
      ar: arabicMessage,
    },
  }
}
