import ServerList from './ServerList'

export default function ServerLists() {
  // 더미데이터
  const data = [
    {
      id: '1',
      channelName: '올바른취업생활',
      channelIconURL: 'https://cdn.discordapp.com/icons/1209059689657016371/0f0a953c0d6c76e50b88304b1b00032e'
    },
    {
      id: '2',
      channelName: '세계관에서 제일 쎈 로스트아크 원정대',
      channelIconURL: 'https://cdn.discordapp.com/icons/1209059689657016371/0f0a953c0d6c76e50b88304b1b00032e'
    }
  ]

  if (!data) return
  return (
    <ul className='flex flex-col gap-3'>
      {data.map(list => (
        <ServerList key={list.id} id={list.id} name={list.channelName} iconSrc={list.channelIconURL} />
      ))}
    </ul>
  )
}
