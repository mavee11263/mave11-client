import React from 'react'

function VideoItemLoading() {
  return (
    <div className='w-full min-h-96 flex-1'>
            <div className=" p-1 max-w-sm w-full mx-auto rounded-lg">
                <div className="relative animate-pulse group flex flex-col items-center">
                    <div className="rounded-lg overflow-hidden md:h-44 h-56 bg-gray-400 w-full aspect-w-1 aspect-h-1 group-hover:opacity-75"></div>
                    <div className="flex-1 flex-col flex space-y-4 py-1 w-full mt-4">
                        <div className="h-4 bg-gray-500 rounded w-3/4"></div>
                        <div className="space-y-2 w-full flex flex-col">
                            <div className="h-4 bg-gray-500 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default VideoItemLoading