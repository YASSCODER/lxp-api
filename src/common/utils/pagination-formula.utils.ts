import { PaginationDto } from '../dto/pagination.dto'

export const paginationParamsFormula = (query: PaginationDto) => {
  return {
    page: Number(query.skip) / Number(query.take) + 1,
    limit: Number(query.take),
  }
}
