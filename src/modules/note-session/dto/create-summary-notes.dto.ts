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
  sessionId: string
  roomId: number
  userId: number
  instructorId: number
}
