// 'use client'
// import { getUserData } from '@/api/firebase'
// import React, { useState } from 'react'

// interface Ownprops {
//   characters: {
//     party0: Character[]
//     party1: Character[]
//     party2: Character[]
//     [key: string]: Character[]
//   }
// }

// interface Character {
//   userId: string
//   character: string
// }

// export default function TeamAllocator({ characters }: Ownprops) {
//   // const [parties, setParties] = useState(characters)

//   // const moveMember = (character: Character, targetParty: string) => {
//   //   const updatedParties = {
//   //     ...parties,
//   //     [targetParty]: [...parties[targetParty], character],
//   //     [targetParty === 'party1' ? 'party2' : 'party1']: parties[targetParty === 'party1' ? 'party2' : 'party1'].filter(
//   //       member => member.character !== character.character
//   //     ),
//   //     party0: parties.party0.filter(member => member.character !== character.character)
//   //   }

//   //   setParties(updatedParties)
//   // }

//   // const getUserInfo = async (userId: string) => {
//   //   const data = await getUserData(userId)
//   //   console.log(data)
//   // }
//   const resetParties = () => {
//     setParties(characters)
//   }

//   const saveParties = () => {}

//   return (
//     <section className='w-full h-full p-4 rounded-lg flex flex-col space-y-2'>
//       <div className='w-full flex justify-end space-x-4'>
//         <button onClick={resetParties}>초기화</button>
//         <button onClick={saveParties}>저장하기</button>
//       </div>
//       <div className='w-full flex justify-between h-full space-x-2'>
//         {['party1', 'party2'].map(partyKey => (
//           <div className='border w-full p-4 rounded' key={partyKey}>
//             {parties[partyKey].map(character => (
//               <div className='flex justify-between w-full' key={character.character}>
//                 <div>{character.character}</div>
//                 <div className='space-x-4'>
//                   <button onClick={() => moveMember(character, partyKey === 'party1' ? 'party2' : 'party1')}>
//                     {partyKey === 'party1' ? '2파티로' : '1파티로'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className='border w-full p-4 space-y-4 h-full rounded'>
//         {parties.party0.map(character => {
//           return (
//             <div className='flex justify-between w-full' key={character.character}>
//               <div>{character.character}</div>
//               <div className='space-x-4'>
//                 <button onClick={() => moveMember(character, 'party1')}>1파티로</button>
//                 <button onClick={() => moveMember(character, 'party2')}>2파티로</button>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }

'use client'

import { useState } from 'react'

interface Ownprops {
  characters: {
    party0: Character[]
    party1: Character[]
    party2: Character[]
  }
}

interface Character {
  userId: string
  character: string
}

export default function TeamAllocator({ characters }: Ownprops) {
  const [party0, setParty0] = useState(characters.party0)
  const [party1, setParty1] = useState(characters.party1)
  const [party2, setParty2] = useState(characters.party2)

  const moveMemberToParty1 = (character: Character) => {
    const updatedParty1 = [...party1, character]
    const updatedParty0 = party0.filter(member => member.character !== character.character)

    setParty1(updatedParty1)
    setParty0(updatedParty0)
  }
  const moveMemberToParty2 = (character: Character) => {
    const updatedParty2 = [...party2, character]
    const updatedParty0 = party0.filter(member => member.character !== character.character)

    setParty2(updatedParty2)
    setParty0(updatedParty0)
  }
  const moveMemberInParties = (character: Character, currentParty: string) => {
    if (currentParty === 'party1') {
      const updatedParty2 = [...party2, character]
      const updatedParty1 = party1.filter(member => member.character !== character.character)

      setParty2(updatedParty2)
      setParty1(updatedParty1)
    }
    if (currentParty === 'party2') {
      const updatedParty1 = [...party1, character]
      const updatedParty2 = party2.filter(member => member.character !== character.character)

      setParty1(updatedParty1)
      setParty2(updatedParty2)
    }
  }

  return (
    <section className='border w-full h-full p-8 rounded-lg shadow-sm'>
      <div className='w-full flex justify-end space-x-4'>
        <button>초기화</button>
        <button>저장하기</button>
      </div>
      <div className='bg-slate-300 w-full h-1/2 flex justify-between'>
        <div className='border w-full p-4'>
          {party1.map(character => (
            <div className='flex justify-between w-full' key={character.character}>
              <div>{character.character}</div>
              <div className='space-x-4'>
                <button
                  onClick={() => {
                    moveMemberInParties(character, 'party1')
                  }}
                >
                  2파티로
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='border w-full p-4'>
          {party2.map(character => (
            <div className='flex justify-between w-full' key={character.character}>
              <div>{character.character}</div>
              <div className='space-x-4'>
                <button
                  onClick={() => {
                    moveMemberInParties(character, 'party2')
                  }}
                >
                  1파티로
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-yellow-300 w-full h-1/2 p-4 space-y-4'>
        {party0.map(character => (
          <div className='flex justify-between w-full' key={character.character}>
            <div>{character.character}</div>
            <div className='space-x-4'>
              <button
                onClick={() => {
                  moveMemberToParty1(character)
                }}
              >
                1파티로
              </button>
              <button
                onClick={() => {
                  moveMemberToParty2(character)
                }}
              >
                2파티로
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
