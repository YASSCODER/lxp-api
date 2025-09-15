import { LearnPath } from '@/common/models/entities/learn-path.entity'
import {
  FetchLearnPathAsItem,
  FetchLearnPathDto,
} from '../dto/fetch-learning-path.dto'
import { SelectQueryBuilder } from 'typeorm'

export function applyLearnPathFilter(
  filtersBuilder: SelectQueryBuilder<LearnPath>,
  filters: FetchLearnPathDto | FetchLearnPathAsItem,
) {
  const filterConfig = [
    {
      condition: filters.searchLike && filters.searchLike.trim() !== '',
      apply: () =>
        filtersBuilder.andWhere(
          '(lp.title->>"en" ILIKE :searchLike OR lp.title->>"ar" ILIKE :searchLike)',
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
