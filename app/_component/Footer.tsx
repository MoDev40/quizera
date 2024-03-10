import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-row space-x-4 items-center justify-center'>
      <Link href="https://github.com/MoDev40" target='_blank'><Github size={30}/></Link>
      <p className="text-center text-xl">
        Quizera © 2024 
      </p>
      <Link className="text-xs" target='_blank' href="https://github.com/MoDev40/quizera">source code</Link>
      </div>
    </footer>  
    )
}

export default Footer