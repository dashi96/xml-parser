import * as React from 'react'
import { FC } from 'react'

interface SearchBarProps {
  onChange: (query: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
  return (
    <div className='p-10 bg-white-0 shadow-xs rounded-xl flex items-center'>
      <input
        onChange={(e) => {
          onChange(e.target.value || '')
        }}
        className='border-none outline-none ring-0 focus:ring-0 placeholder-grayscale-250 flex-grow'
        placeholder='Поиск'
      />
    </div>
  )
}

export default SearchBar
