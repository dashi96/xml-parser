import React, { FC } from 'react'
import { Event } from '../hooks/useEventsQuery'

interface EventsListProps {
  events: Event[]
}

const EventsList: FC<EventsListProps> = ({ events }) => {
  return (
    <div className='p-10 shadow-xs rounded-xl'>
      {!!events?.length ? (
        <table className='w-full text-center'>
          <thead className='text-grayscale-200'>
            <tr>
              <th className='pb-10'>ID</th>
              <th className='pb-10'>Дата</th>
              <th className='pb-10'>Название</th>
              <th className='pb-10'>Категория</th>
              <th className='pb-10'>Регион</th>
              <th className='pb-10'>Мин. цена</th>
              <th className='pb-10'>Макс. цена</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className='py-6 px-4'>{event.id}</td>
                <td className='py-6 px-4'>{event.date}</td>
                <td className='py-6 px-4'>{event.title}</td>
                <td className='py-6 px-4'>{event.category}</td>
                <td className='py-6 px-4'>{event.region}</td>
                <td className='py-6 px-4'>{event.min_price}</td>
                <td className='py-6 px-4'>{event.max_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='flex justify-center text-h300'>Нет данных</div>
      )}
    </div>
  )
}

export default EventsList
