import { updateRegisteredChar } from '@/api/firebase'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ChaListInterface } from '@/types/characterList'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { FaCheck, FaSort } from 'react-icons/fa'

interface Ownprops {
  setIsOpen: (arg0: boolean) => void
  registeredBy: string
}

export default function SettingModal({ setIsOpen, registeredBy }: Ownprops) {
  const [selected, setSelected] = useState(registeredBy)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [charList, setCharList] = useState<ChaListInterface[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    const fetchCharacters = async () => {
      const list = await getCharacterList(registeredBy)
      setCharList(list)
    }

    fetchCharacters()
  }, [isDropdownOpen])

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleDropdownClick = (char: string) => {
    setSelected(char)
    setIsDropdownOpen(false)
  }

  const handleEdit = async () => {
    const userId = session?.user.id
    await updateRegisteredChar(userId, selected)
    window.location.reload()
  }

  return (
    <>
      <div className='absolute z-40 w-screen h-full bg-gray-900/30 top-0 left-0' onClick={() => setIsOpen(false)} />
      <div className='z-50 border fixed top-1/2 left-1/2 w-[15rem] bg-light dark:bg-dark -translate-x-1/2 -translate-y-1/2 shadow-xl rounded flex flex-col p-4 space-y-4'>
        <button
          onClick={() => handleDropdown()}
          className='w-full border p-2 rounded flex justify-between items-center hover:bg-secondary-gray/50 transition'
        >
          <div>{selected}</div>
          <FaSort />
        </button>

        {isDropdownOpen && (
          <div className='border rounded p-2 overflow-scroll space-y-2 absolute top-12 bg-light dark:bg-dark w-[13rem] h-[18rem]'>
            {charList.map((character, idx) => (
              <button
                onClick={() => handleDropdownClick(character.CharacterName)}
                key={idx}
                className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between'
              >
                <div>{character.CharacterName}</div>
                {selected === character.CharacterName && <FaCheck />}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => handleEdit()}
          className='truncate h-10 md:px-4 md:py-2 px-2 transition rounded border bg-primary-accent hover:bg-primary-accent/70 text-xs md:text-sm font-semibold'
        >
          대표캐릭터 수정하기
        </button>
      </div>
    </>
  )
}
