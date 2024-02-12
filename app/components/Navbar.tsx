import Link from 'next/link'
import React from 'react'
import {FaTwitter, FaGithub} from 'react-icons/fa'
import ThemeToggleBtn from './ThemeToggleBtn'
import { Home, HomeIcon } from 'lucide-react'

export default function Navbar() {

  return (
    <nav className=' p-4 sticky bg-background top-0 drop-shadow-xl z-10 border-b border-2'>
        <div className='md:px-6 prose prose-xl mx-auto flex justify-between items-center'>
            <h1 className='text-3xl font-bold grid place-content-center mb-2 md:mb-0'>
              <Link href='/' className='flex gap-1 items-center no-underline text-slate-700 dark:text-slate-300 hover:opacty/90'><span className='hidden md:inline-flex'>Douglas Kipyegon</span><HomeIcon  /></Link>
            </h1>
            <div className='flex flex-row items-center gap-4  text-4xl lg:text-5xl'>
                <Link className='' href='https://github.com/kippytech'>
                    <FaGithub title='github icon' className='text-slate-700 dark:text-slate-300 hidden md:inline-flex' size={30} />
                </Link>
                <Link className='text-white/90 hover:text-white' href='https://twitter.com/kipyegosancho'>
                    <FaTwitter title='twitter aka X icon' className='text-slate-700 dark:text-slate-300 hidden md:inline-flex' size={30} />
                </Link>
                <ThemeToggleBtn />
            </div>
        </div>
    </nav>
  )
}
