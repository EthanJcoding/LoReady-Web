export const extractCapacity = (raidType: string) => {
  const capacity = raidType.substring(0, raidType.indexOf('인'))

  return capacity
}
