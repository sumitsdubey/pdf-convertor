'use client'

import { useRouter } from 'next/navigation'
import React from 'react'


const Home = () => {

  const router = useRouter()


  return (
    <>
    {
      router.push("/dashboard")
    }
    
    </>
  )
}

export default Home