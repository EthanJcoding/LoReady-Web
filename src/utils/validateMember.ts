export const validateMember = (userId: string | undefined, memberIds: string[] | undefined) => {
  return !!userId && !!memberIds?.includes(userId)
}
