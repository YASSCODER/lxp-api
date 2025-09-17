import { SelectQueryBuilder } from 'typeorm'
import { FetchModuleAsListItemDto } from '../dto/fetch-module.dto'
import { LearningUnit } from '@/common/models/entities/module.entity'

export function applyModuleFilter(
  filtersBuilder: SelectQueryBuilder<LearningUnit>,
  filters: FetchModuleAsListItemDto,
) {
  const filterConfig = [
    {
      condition: filters.searchLike && filters.searchLike.trim() !== '',
      apply: () =>
        filtersBuilder.andWhere(
          '(module.title->>"en" ILIKE :searchLike OR module.title->>"ar" ILIKE :searchLike)',
          {
            searchLike: `%${filters.searchLike}%`,
          },
        ),
    },
  ]

  filterConfig.forEach((filter) => {
    if (filter.condition) {
      filter.apply()
    }
  })

  return filtersBuilder
}
