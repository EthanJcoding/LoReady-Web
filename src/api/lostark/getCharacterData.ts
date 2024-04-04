import axios from 'axios'

export const getCharacterData = async (chaName: string) => {
  try {
    const data = await axios.get(
      `${process.env.LOSTARK_BASE_URL}/armories/characters/${chaName}?filters=profiles%2Bequipment%2Bavatars%2Bcombat-skills%2Bengravings%2Bcards%2Bgems`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${process.env.LOSTARK_API_KEY}`
        }
      }
    )

    return data.data
  } catch (err) {
    console.error(err)
  }
}
