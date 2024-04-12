export const validateMember = (userId: string | undefined, memberIds: string[]) => {
  return !!userId && memberIds.includes(userId)
}
