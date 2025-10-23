import { AnswerTextEmbedded } from '@/common/models/embedded/answer-text.embedded'
import { QuestionTextEmbedded } from '@/common/models/embedded/question-text.embedded'

export interface GetOnboardingQA {
  id: number
  question: QuestionTextEmbedded
  answers: {
    id: number
    answer: AnswerTextEmbedded
    scale: number
  }[]
}
