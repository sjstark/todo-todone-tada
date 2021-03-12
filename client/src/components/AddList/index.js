import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Container,
  Box,
  Button,
  Input,
  Typography
} from '@material-ui/core'

import { createNewList } from '../../store/list'

export default function AddList() {
  const [title, setTitle] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(createNewList({ title }))
    setTitle('')
  }

  return (
    <Container maxWidth="md">
      <Box m={1} p={1} display="flex" alignItems="center" justifyContent="space-around">
        <Typography>
          Create A New Todo List:
        </Typography>
        <Input
          type="text"
          placeholder="List Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Create List
          </Button>
      </Box>
    </Container>
  )
}
