import axios from 'axios'

export const getCharacterProfile = async (chaName: string) => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_LOSTARK_BASE_URL}/armories/characters/${chaName}/profiles`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API_KEY}`
        }
      }
    )

    return data.data
  } catch (err) {
    console.error(err)
  }
}
