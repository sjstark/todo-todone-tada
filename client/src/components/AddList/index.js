import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { createNewList } from '../../store/list'

export default function AddList() {
  const [title, setTitle] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(createNewList({ title }))
    setTitle('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="List Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <button
        onClick={handleSubmit}
      >
        Create List
      </button>
    </div>
  )
}
