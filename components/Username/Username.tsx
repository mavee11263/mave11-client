import { BadgeCheckIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'

interface Props{
    className?: string,
    verified?: boolean,
    username:string
}

function Username({className, verified, username}:Props):ReactElement {
  return (
    <div className={`${className} flex flex-row items-center`}>
        <p>{username}</p>
        {verified && <BadgeCheckIcon className='text-blue-700' height={16} width={16} />}
    </div>
  )
}

export default Username