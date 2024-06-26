import { updateRegisteredChar } from '@/api/firebase'
import { getCharacterList } from '@/api/lostark/getCharacterList'
import { ChaListInterface } from '@/types/characterList'
import { Session } from 'next-auth'
import { useReducer, useEffect, useCallback, useMemo } from 'react'
import { FaCheck, FaSort } from 'react-icons/fa'

interface OwnProps {
  setIsOpen: (arg0: boolean) => void
  registeredBy: string
  session: Session | null
}

interface State {
  selected: string
  isDropdownOpen: boolean
  charList: ChaListInterface[]
  error: string | null
}

type Action =
  | { type: 'SET_SELECTED'; payload: string }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'SET_CHAR_LIST'; payload: ChaListInterface[] }
  | { type: 'SET_ERROR'; payload: string }

const initialState: State = {
  selected: '',
  isDropdownOpen: false,
  charList: [],
  error: null
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SELECTED':
      return { ...state, selected: action.payload }
    case 'TOGGLE_DROPDOWN':
      return { ...state, isDropdownOpen: !state.isDropdownOpen }
    case 'SET_CHAR_LIST':
      return { ...state, charList: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default function SettingModal({ setIsOpen, registeredBy, session }: OwnProps) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, selected: registeredBy })

  const fetchCharacters = useCallback(async () => {
    try {
      const list = await getCharacterList(registeredBy)
      dispatch({ type: 'SET_CHAR_LIST', payload: list })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch characters' })
    }
  }, [registeredBy])

  useEffect(() => {
    if (state.isDropdownOpen) {
      fetchCharacters()
    }
  }, [state.isDropdownOpen, fetchCharacters])

  const handleDropdown = useCallback(() => {
    dispatch({ type: 'TOGGLE_DROPDOWN' })
  }, [])

  const handleDropdownClick = useCallback((char: string) => {
    dispatch({ type: 'SET_SELECTED', payload: char })
    dispatch({ type: 'TOGGLE_DROPDOWN' })
  }, [])

  const handleEdit = useCallback(async () => {
    const userId = session?.user.id
    if (userId) {
      try {
        await updateRegisteredChar(userId, state.selected)
        window.location.reload()
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update character' })
      }
    }
  }, [session, state.selected])

  const sortedCharList = useMemo(
    () => [...state.charList].sort((a, b) => b.ItemAvgLevel.localeCompare(a.ItemAvgLevel)),
    [state.charList]
  )

  return (
    <>
      <div className='absolute z-40 w-screen h-full bg-gray-900/30 top-0 left-0' onClick={() => setIsOpen(false)} />
      <div className='z-50 border fixed top-1/2 left-1/2 w-[20rem] bg-light dark:bg-dark -translate-x-1/2 -translate-y-1/2 shadow-xl rounded flex flex-col p-4 space-y-4'>
        <button
          onClick={handleDropdown}
          className='w-full border p-2 rounded flex justify-between items-center hover:bg-secondary-gray/50 transition'
          aria-haspopup='listbox'
          aria-expanded={state.isDropdownOpen}
        >
          <div>{state.selected}</div>
          <FaSort />
        </button>

        {state.isDropdownOpen && (
          <div
            className='border rounded p-2 overflow-y-auto space-y-2 absolute top-12 bg-light dark:bg-dark w-[18rem] max-h-[12rem]'
            role='listbox'
          >
            {state.error ? (
              <div>{state.error}</div>
            ) : (
              sortedCharList.map((character, idx) => (
                <CharacterItem
                  key={idx}
                  character={character}
                  isSelected={state.selected === character.CharacterName}
                  onClick={() => handleDropdownClick(character.CharacterName)}
                />
              ))
            )}
          </div>
        )}
        <button
          onClick={handleEdit}
          className='truncate text-light bg-primary-accent hover:bg-primary-accent/70 font-medium h-10 md:px-4 md:py-2 px-2 rounded transition text-sm sm:text-base'
        >
          대표캐릭터 수정하기
        </button>
      </div>
    </>
  )
}

interface CharacterItemProps {
  character: ChaListInterface
  isSelected: boolean
  onClick: () => void
}

function CharacterItem({ character, isSelected, onClick }: CharacterItemProps) {
  return (
    <button
      onClick={onClick}
      className='flex items-center hover:bg-secondary-gray/50 w-full p-1 rounded transition justify-between gap-2'
      role='option'
      aria-selected={isSelected}
    >
      {isSelected && <FaCheck color='#00a4e8' />}
      <div className='flex justify-between w-full items-center'>
        <span className='text-sm'>{character.CharacterName}</span>
        <span className='text-xs'>{character.ItemAvgLevel}</span>
      </div>
    </button>
  )
}
