import { useState, useEffect } from 'react'
import axios from 'axios'

export type Event = {
  _id: number
  id: string
  age: string
  category: string
  date: string
  date_type: string
  description: string
  google_address: string
  image: string
  max_price: number
  min_price: number
  region: string
  title: string
  url: string
  venue_address: string
  venue_alias: string
  venue_id: string
  web_tag_groups: string
}

const useEventsQuery = (query = ''): Event[] => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    console.log(query)
    let url = `http://localhost:4200/events?page=1&limit=1000`
    if (query?.length) {
      url += `&filter=${query}`
    }

    axios
      .get(url)
      .then((res) => {
        setEvents(res.data)
      })
      .catch(() => {
        setEvents([])
      })
  }, [query])

  return events
}

export default useEventsQuery
