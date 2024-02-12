import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'
import React from 'react'

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    const { id, title, date, snippet, duration } = post
    const formattedDate = getFormattedDate(date)
  return (
    <div className='space-y-'>
      <div className='bg-slate-300 w-full h-[0.3px]' />
    <li className='text-2xl dark:text-white/90'>
        <Link className='hover:underline hover:text-black/70 dark:hover:text-white no-underline' href={`/posts/${id}`}>{title}</Link>
        <br />
        <div className='mt-1 flex gap-3 items-center'>
        <p className='text-sm '>{formattedDate}</p>
        <span className='text-sm'>{duration}</span>
        </div>
        <p className='mt-0'>{snippet}</p>
    </li>
    </div>
  )
}