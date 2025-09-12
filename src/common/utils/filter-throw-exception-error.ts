export function formatErrorResponse(input: {
  message: { en: string; ar: string }
  path: string
  codeError?: string
}): object {
  return {
    message: input.message,
    path: input.path,
    timestamp: new Date().toISOString(),
    code: input.codeError ?? undefined,
  }
}
