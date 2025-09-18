import { Skill } from '@/common/models/entities/skills.entity'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'
import { CreateSkillDto } from '../dto/create-skill.dto'
import { throwFormValidationError } from '@/common/utils/errors.utils'
import { ErrorCodes } from '@/common/enum/error-codes.enum'
import { FetchSkillAsListItemDto, FetchSkillDto } from '../dto/fetch-skill.dto'
import { paginationParamsFormula } from '@/common/utils/pagination-formula.utils'
import {
  PaginationResult,
  PaginationService,
} from '@/common/pagination/pagination.service'
import { S3Service } from '@/common/aws/service/s3.service'
import { applySkillFilter } from '../helper/filter.helper'
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
} from '@/common/utils/success-messages.utils'
import { AssignSkillToLearner } from '../dto/assign-skill-learner.dto'
import { User } from '@/common/models/entities/user.entity'
import { LearnerSkillLinker } from '@/common/models/entities/learner-skill-linker.entity'
import { LearnerModuleLinker } from '@/common/models/entities/learner-module-link.entity'
import { LearnPath } from '@/common/models/entities/learn-path.entity'
import { Course } from '@/common/models/entities/course.entity'
import { LearnerLearnPath } from '@/common/models/entities/learner-learn-path-link.entity'
import { LearnerCourseLinker } from '@/common/models/entities/learner-course-linker.entity'

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(LearnerSkillLinker)
    private readonly learnerSkillLinkerRepository: Repository<LearnerSkillLinker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service,
    private readonly dataSource: DataSource,
  ) {}

  async createSkill(payload: CreateSkillDto) {
    try {
      const existingSkill = await this.skillRepository
        .createQueryBuilder('skill')
        .where("skill.title->>'en' = :enTitle", { enTitle: payload.title.en })
        .orWhere("skill.title->>'ar' = :arTitle", { arTitle: payload.title.ar })
        .getOne()

      if (existingSkill) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_ALREADY_FOUND,
          message: {
            en: `skill already exists`,
            ar: `المهارة موجودة بالفعل`,
          },
        })
      }

      const skillEntity = this.skillRepository.create({ ...payload })
      const skillSaved = await this.skillRepository.save(skillEntity)

      return getCreateSuccessMessage({
        entityName: 'skill',
        entityId: skillSaved.id,
      })
    } catch (error) {
      if (error.errorCode === ErrorCodes.ENTITY_ALREADY_FOUND) {
        throw error
      }

      throwFormValidationError({
        errorCode: ErrorCodes.ENTITY_NOT_FOUND,
        message: {
          en: `Failed to create skill`,
          ar: `فشل في إنشاء المهارة`,
        },
      })
    }
  }

  async listAllSkillsWithPagination(
    payload: FetchSkillDto,
  ): Promise<PaginationResult<Partial<Skill>>> {
    const paginationParams = paginationParamsFormula(payload)

    const qb = this.skillRepository
      .createQueryBuilder('skill')
      .leftJoinAndSelect('skill.modules', 'module')
      .leftJoinAndSelect('module.learnPaths', 'learnPath')

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = await Promise.all(
      data.map(async (skill) => {
        const image = await this.s3Service.generateSignedDownloadUrl(
          skill.file.key,
        )
        const module = await Promise.all(
          skill.modules.map(async (module) => {
            const image = await this.s3Service.generateSignedDownloadUrl(
              module.file.key,
            )
            return {
              id: module.id,
              title: module.title,
              image,
            }
          }),
        )
        return {
          id: skill.id,
          title: skill.title,
          description: skill.description,
          image,
          module,
        }
      }),
    )

    return {
      data: mappedData,
      pagination,
    }
  }

  async listAllSkillsForContractorWithPagination(
    payload: FetchSkillDto,
    user: User,
  ): Promise<PaginationResult<Partial<Skill>>> {
    const paginationParams = paginationParamsFormula(payload)

    const userFound = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    })

    const qb = this.skillRepository
      .createQueryBuilder('skill')
      .leftJoinAndSelect('skill.modules', 'module')
      .leftJoinAndSelect('skill.learnerLinks', 'learnerLink')
      .leftJoinAndSelect('module.learnPaths', 'learnPath')
      .where('learnerLink.learnerId = :learnerId', {
        learnerId: userFound.learnerId,
      })

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = await Promise.all(
      data.map(async (skill) => {
        const image = await this.s3Service.generateSignedDownloadUrl(
          skill.file.key,
        )
        const module = await Promise.all(
          skill.modules.map(async (module) => {
            const image = await this.s3Service.generateSignedDownloadUrl(
              module.file.key,
            )
            return {
              id: module.id,
              title: module.title,
              image,
            }
          }),
        )
        return {
          id: skill.id,
          title: skill.title,
          description: skill.description,
          image,
          module,
        }
      }),
    )

    return {
      data: mappedData,
      pagination,
    }
  }

  async listAllSkillsForInstructorWithPagination(
    payload: FetchSkillDto,
    user: User,
  ): Promise<PaginationResult<Partial<Skill>>> {
    const paginationParams = paginationParamsFormula(payload)

    const userFound = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    })

    const qb = this.skillRepository
      .createQueryBuilder('skill')
      .leftJoinAndSelect('skill.modules', 'module')
      .leftJoinAndSelect('skill.instructorLinks', 'instructorLink')
      .leftJoinAndSelect('module.learnPaths', 'learnPath')
      .where('instructorLink.instructorId = :instructorId', {
        instructorId: userFound.instructorId,
      })

    const { data, pagination } =
      await this.paginationService.paginateWithQueryBuilder(
        qb,
        paginationParams,
      )

    const mappedData = await Promise.all(
      data.map(async (skill) => {
        const image = await this.s3Service.generateSignedDownloadUrl(
          skill.file.key,
        )
        const module = await Promise.all(
          skill.modules.map(async (module) => {
            const image = await this.s3Service.generateSignedDownloadUrl(
              module.file.key,
            )
            return {
              id: module.id,
              title: module.title,
              image,
            }
          }),
        )
        return {
          id: skill.id,
          title: skill.title,
          description: skill.description,
          image,
          module,
        }
      }),
    )

    return {
      data: mappedData,
      pagination,
    }
  }

  async listSkillsAsItems(payload: FetchSkillAsListItemDto) {
    const qb = this.skillRepository.createQueryBuilder('skill')
    qb.limit(10)
    applySkillFilter(qb, payload)
    const data = await qb.getMany()

    const mappedSkillData = data.map((skill) => ({
      id: skill.id,
      title: skill.title,
    }))

    return {
      data: mappedSkillData,
    }
  }

  async deleteSkill(id: number) {
    console.log(id)
    const skillFound = await this.skillRepository.findOneOrFail({
      where: { id },
    })
    await this.skillRepository.softRemove(skillFound)

    return getDeleteSuccessMessage({
      entityName: 'skill',
      entityId: skillFound.id,
    })
  }

  async assignSkillToLearner(user: User, payload: AssignSkillToLearner) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const skillFound = await queryRunner.manager.findOne(Skill, {
        where: { id: payload.skillId },
        relations: {
          modules: {
            learnPaths: {
              courses: true,
            },
          },
        },
      })

      if (!skillFound) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_NOT_FOUND,
          id: {
            message: {
              en: `Skill not found with id: ${user.id}`,
              ar: ``,
            },
          },
        })
      }

      const moduleIds = skillFound.modules.map((m) => m.id)

      const learnPathsFound = await queryRunner.manager.find(LearnPath, {
        where: { learningUnitId: In(moduleIds) },
      })
      const learnPathsId = learnPathsFound.map((lp) => lp.id)

      const courseFound = await queryRunner.manager.find(Course, {
        where: { learnPathId: In(learnPathsId) },
      })
      const courseIds = courseFound.map((c) => c.id)

      const userFound = await queryRunner.manager.findOne(User, {
        where: { id: user.id },
        relations: { learner: true },
      })

      if (!userFound?.learnerId) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_NOT_FOUND,
          id: {
            message: {
              en: 'User does not have a learner profile',
              ar: 'المستخدم ليس لديه ملف متعلّم',
            },
          },
        })
      }

      const learnerSkillEntity = queryRunner.manager.create(
        LearnerSkillLinker,
        {
          learnerId: userFound.learnerId,
          skillId: skillFound.id,
        },
      )
      await queryRunner.manager.save(learnerSkillEntity)

      const moduleEntities = moduleIds.map((moduleId) =>
        queryRunner.manager.create(LearnerModuleLinker, {
          learnerId: userFound.learnerId,
          moduleId,
        }),
      )

      const learnPathEntities = learnPathsId.map((lpId) =>
        queryRunner.manager.create(LearnerLearnPath, {
          learnerId: userFound.learnerId,
          learnPathId: lpId,
        }),
      )

      const courseEntities = courseIds.map((cId) =>
        queryRunner.manager.create(LearnerCourseLinker, {
          learnerId: userFound.learnerId,
          courseId: cId,
        }),
      )

      await queryRunner.manager.save([
        ...moduleEntities,
        ...learnPathEntities,
        ...courseEntities,
      ])

      await queryRunner.commitTransaction()
      return {
        status: 201,
        message: {
          en: `skill with id: ${skillFound.id} assigned to learner with id : ${userFound.learnerId}`,
          ar: `تم ربط المهارة بالمعرّف: ${skillFound.id} مع المتعلّم بالمعرّف: ${userFound.learnerId}`,
        },
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async updateLearnerSkill(id: number, payload: AssignSkillToLearner) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const skillFound = await queryRunner.manager.findOne(Skill, {
        where: { id: payload.skillId },
        relations: {
          modules: { learnPaths: { courses: true } },
        },
      })

      if (!skillFound) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_NOT_FOUND,
          id: {
            message: {
              en: `Skill not found with id: ${payload.skillId}`,
              ar: `المهارة غير موجودة بالمعرّف: ${payload.skillId}`,
            },
          },
        })
      }

      const moduleIds = skillFound.modules.map((m) => m.id)
      const learnPathsFound = await queryRunner.manager.find(LearnPath, {
        where: { learningUnitId: In(moduleIds) },
      })
      const learnPathsId = learnPathsFound.map((lp) => lp.id)

      const courseFound = await queryRunner.manager.find(Course, {
        where: { learnPathId: In(learnPathsId) },
      })
      const courseIds = courseFound.map((c) => c.id)

      const userFound = await queryRunner.manager.findOne(User, {
        where: { learnerId: id },
        relations: { learner: true },
      })

      if (!userFound?.learnerId) {
        throwFormValidationError({
          errorCode: ErrorCodes.ENTITY_NOT_FOUND,
          id: {
            message: {
              en: 'User does not have a learner profile',
              ar: 'المستخدم ليس لديه ملف متعلّم',
            },
          },
        })
      }

      const learnerId = userFound.learnerId

      let learnerSkillEntity = await queryRunner.manager.findOne(
        LearnerSkillLinker,
        {
          where: { learnerId, skillId: skillFound.id },
        },
      )

      if (learnerSkillEntity) {
        Object.assign(learnerSkillEntity, payload)
      } else {
        learnerSkillEntity = queryRunner.manager.create(LearnerSkillLinker, {
          learnerId,
          skillId: skillFound.id,
        })
      }
      await queryRunner.manager.save(learnerSkillEntity)

      const moduleEntities = await Promise.all(
        moduleIds.map(async (moduleId) => {
          let entity = await queryRunner.manager.findOne(LearnerModuleLinker, {
            where: { learnerId, moduleId },
          })

          if (entity) {
            Object.assign(entity, { ...payload })
          } else {
            entity = queryRunner.manager.create(LearnerModuleLinker, {
              learnerId,
              moduleId,
            })
          }
          return entity
        }),
      )

      const learnPathEntities = await Promise.all(
        learnPathsId.map(async (lpId) => {
          let entity = await queryRunner.manager.findOne(LearnerLearnPath, {
            where: { learnerId, learnPathId: lpId },
          })

          if (entity) {
            Object.assign(entity, { ...payload })
          } else {
            entity = queryRunner.manager.create(LearnerLearnPath, {
              learnerId,
              learnPathId: lpId,
            })
          }
          return entity
        }),
      )

      const courseEntities = await Promise.all(
        courseIds.map(async (cId) => {
          let entity = await queryRunner.manager.findOne(LearnerCourseLinker, {
            where: { learnerId, courseId: cId },
          })

          if (entity) {
            Object.assign(entity, { ...payload })
          } else {
            entity = queryRunner.manager.create(LearnerCourseLinker, {
              learnerId,
              courseId: cId,
            })
          }
          return entity
        }),
      )

      await queryRunner.manager.save([
        ...moduleEntities,
        ...learnPathEntities,
        ...courseEntities,
      ])

      await queryRunner.commitTransaction()
      return {
        status: 200,
        message: {
          en: `Skill ${skillFound.id} and related entities updated for learner ${learnerId}`,
          ar: `تم تحديث المهارة ${skillFound.id} والكيانات المرتبطة للمتعلّم ${learnerId}`,
        },
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async getTotalCount() {
    const result = await this.skillRepository
      .createQueryBuilder('skill')
      .getCount()

    return {
      value: result,
    }
  }
}
