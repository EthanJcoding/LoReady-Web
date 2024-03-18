export const extractBossRank = (raidName: string) => {
  let [boss, rank] = raidName.split(' ')

  rank = rank.substring(1, rank.length - 1)

  switch (rank) {
    case '노말':
      rank = 'NOMAL'
      break
    case '하드':
      rank = 'HARD'
      break
    case '헬':
      rank = 'HELL'
      break
  }

  return { boss, rank }
}
