import { Injectable } from '@nestjs/common'
import { SelectQueryBuilder } from 'typeorm'

export interface PaginationParams {
  limit: number
  page: number
}

interface Pagination {
  rowCount: number
  pageCount: number
  itemsPerPage: number
}

export interface PaginationResult<T> {
  data: T[]
  pagination: Pagination
}

@Injectable()
export class PaginationService {
  async paginateWithQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T>,
    options: PaginationParams,
    raw?: boolean,
  ): Promise<PaginationResult<T>> {
    const { page, limit } = options

    const skip = (page - 1) * limit
    let data = []
    let totalCount = 0

    if (raw === true) {
      data = await queryBuilder.limit(limit).offset(skip).getRawMany()
      totalCount = await queryBuilder.getCount()
    } else {
      ;[data, totalCount] = await queryBuilder
        .skip(skip)
        .take(limit)
        .getManyAndCount()
    }

    const totalPages = limit > 0 ? Math.ceil(totalCount / limit) : 0

    if (page > totalPages) {
      return {
        data: [],
        pagination: {
          rowCount: totalCount,
          pageCount: totalPages,
          itemsPerPage: limit,
        },
      }
    }

    return {
      data,
      pagination: {
        rowCount: totalCount,
        pageCount: totalPages,
        itemsPerPage: limit,
      },
    }
  }

  async paginateRawQuery<T>(
    queryBuilder: SelectQueryBuilder<T>,
    options: PaginationParams,
  ): Promise<PaginationResult<T>> {
    const { page, limit } = options
    const skip = (page - 1) * limit

    const totalCountQuery = queryBuilder.clone()

    const totalCount = await totalCountQuery.getCount()

    const paginatedData = await queryBuilder
      .limit(limit)
      .offset(skip)
      .getRawMany()

    const pageCount = Math.ceil(totalCount / limit)

    return {
      data: paginatedData,
      pagination: {
        rowCount: totalCount,
        pageCount,
        itemsPerPage: limit,
      },
    }
  }
}
