import React from 'react'

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full mt-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-800"></div>
    </div>
  )
}
