import { Skill } from '@/common/models/entities/skills.entity'
import { FetchSkillAsListItemDto } from '../dto/fetch-skill.dto'
import { SelectQueryBuilder } from 'typeorm'

export function applySkillFilter(
  filtersBuilder: SelectQueryBuilder<Skill>,
  filters: FetchSkillAsListItemDto,
) {
  const filterConfig = [
    {
      condition: filters.searchLike && filters.searchLike.trim() !== '',
      apply: () =>
        filtersBuilder.andWhere(
          '(skill.title->>"en" ILIKE :searchLike OR skill.title->>"ar" ILIKE :searchLike)',
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
