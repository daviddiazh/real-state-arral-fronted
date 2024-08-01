import React from 'react'
import { useParams } from 'react-router-dom'

export const Search = () => {

  const { serviceType, code } = useParams();

  console.log({ serviceType, code });

  return (
    <div>Search</div>
  )
}
