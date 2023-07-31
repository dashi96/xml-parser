import React, { FC, useState } from 'react'
import SearchBar from '../components/SearchBar'
import EventsList from '../components/EventsList'
import useEventsQuery from '../hooks/useEventsQuery'
import useThrottledState from '../hooks/useThrottledState'

const Main: FC = () => {
  const [queryText, setQueryText] = useState('')
  const [query] = useThrottledState(queryText, 500)

  const events = useEventsQuery(query)

  return (
    <div className='py-15 flex-grow container flex flex-col gap-10'>
      <SearchBar onChange={(text) => setQueryText(text)} />

      <EventsList events={events} />
    </div>
  )
}

export default Main
