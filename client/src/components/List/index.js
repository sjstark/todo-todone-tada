import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { updateList, deleteList, addTask } from '../../store/list'

import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  List,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Task from '../Task'

export default function ListElement({ list }) {
  const dispatch = useDispatch()

  const { tasks } = list

  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)

  const [title, setTitle] = useState(list.title)
  const [task, setTask] = useState({ title: "", description: "" })

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  const handleUpdateTitle = () => {
    dispatch(updateList({ ...list, title }))
    handleCloseEdit()
  }

  const handleTaskCreate = () => {
    dispatch(addTask(task, list.id))
    handleCloseAdd()
    task = { title: "", description: "" }
  }

  const handleDelete = () => {
    dispatch(deleteList(list.id))
  }

  return (
    <>
      <Box boxShadow={2} borderRadius={10} m={2} overflow="hidden">
        <Box color="white" bgcolor="info.main" p={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {list.title}
          </Typography>
          <Box fontSize="small">
            <IconButton
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => { setOpenEdit(!openEdit) }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => { setOpenAdd(!openAdd) }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <List>
          {tasks && tasks.map(task => <Task listId={list.id} task={task} key={task.id} />)}
        </List>
      </Box >

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <Box m={1}>
          <DialogTitle>{`Edit title of ${list.title}`}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              value={title}
              onChange={({ target }) => { setTitle(target.value) }}
              type="text"
              fullWidth
            />
          </DialogContent>
          <Box display="flex" justifyContent="space-around" m={1}>
            <Button onClick={() => { setOpenEdit(false) }} variant="contained" color="default" >
              Cancel
            </Button>
            <Button onClick={handleUpdateTitle} variant="contained" color="primary">
              Update Title
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
      >
        <Box m={1}>
          <DialogTitle>{`Add a task to ${list.title}`}</DialogTitle>
          <DialogContent>
            <TextField

              label="Task Title"
              value={task.title}
              onChange={({ target }) => { setTask({ ...task, title: target.value }) }}
              type="text"
              fullWidth
            />
            <TextField
              label="Task Description"
              value={task.description}
              onChange={({ target }) => { setTask({ ...task, description: target.value }) }}
              type="text"
              fullWidth
            />
          </DialogContent>
          <Box display="flex" justifyContent="space-around" m={1}>
            <Button onClick={() => { setOpenAdd(false) }} variant="contained" color="default" >
              Cancel
            </Button>
            <Button onClick={handleTaskCreate} variant="contained" color="primary">
              Add Task
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
