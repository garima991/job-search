import React from 'react'

export default function loading() {
  return (
    <div className='px-4 py-16 mx-auto'>
      {/* {Array.from({ length: 8 }).map((_, idx) => ( */}
        <div
          // key={idx}
          className="p-5 rounded-lg bg-gray-800 border border-gray-700 shadow animate-pulse"
        >
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-24"></div>
        </div>
      {/* ))} */}
    </div>
  )
};