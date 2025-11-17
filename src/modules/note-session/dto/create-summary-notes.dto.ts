export class CreateSummaryNotesDto {
  summary: {
    actionItems: string[]
    duration: number
    generatedAt: string
    keyPoints: string[]
    model: string
    summary: string
    participantsId: number[]
  }
  sessionId: number
  roomId: number
  userId: number
  instructorId: number
}
