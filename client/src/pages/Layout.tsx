import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './Main'

const Layout: FC = () => {
  return (
    <div className='min-h-screen bg-white-0 flex justify-center'>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  )
}

export default Layout
