import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%^&*()_+'
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])


  const coppyPassword = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 99)
    // Copy the text inside the text field
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }
    , [length, numberAllowed, characterAllowed, generatePassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-blue-700'>

        <h3 className='text-black'>Password Generator</h3>
        <div className='flex gap-x-4'>
          <input
            type='text'
            value={password}
            onChange={(e) => setLength(e.target.value)}
            className='outline-none w-full py-1 px-3 bg-white rounded-md my-2'
            placeholder='Password'
            ref={passRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={coppyPassword}>coppy</button>
        </div>
        <div className='flex text-sm gap-x-z'>
          <div className='flex items-center gap-x-2'>
            <input
              type='range'
              min={8}
              max={20}
              value={length}
              className='pinter-cursor'
              onChange={(e) => setLength(e.target.value)}

            />
            <span className='text-black'>Length-{length}</span>

          </div>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            onChange={(e) => setNumberAllowed((pre) => !pre)}
          />
          <label className='text-black'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={characterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
          <label className='text-black'>Include Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
