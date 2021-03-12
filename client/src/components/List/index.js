import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { updateList } from '../../store/list'

import { Typography, Box, Container, Grid, Button, List } from '@material-ui/core'


import Task from '../Task'

export default function ListElement({ list }) {
  const { tasks } = list

  const [title, setTitle] = useState(list.title)


  return (
    <Box border={1} borderRadius={10} m={1} overflow="hidden">
      <Box color="text.primary" bgcolor="info.main" p={1}>
        <Typography variant="h6">
          {list.title}
        </Typography>
      </Box>
      <List>
        {tasks.map(task => <Task task={task} key={task.id} />)}
      </List>
    </Box >
  )
}
