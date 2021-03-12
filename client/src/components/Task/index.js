import React, { useState } from 'react'

import {
  Button,
  ListItem,
  ListItemIcon,
  Checkbox,
  Collapse,
  List,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export default function Task({ task }) {

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)

  const { comments } = task

  const handleToggle = () => {

  }

  const closeCommentDialog = () => {
    setOpenAdd(false)
  }

  const handleCommentCreate = () => {

    closeCommentDialog()
  }

  const handleDelete = () => {

  }

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.isComplete}
            onChange={handleToggle}

          />
        </ListItemIcon>
        <ListItemText>
          {task.title}
        </ListItemText>
        <IconButton
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => setOpenAdd(!openAdd)} >
          <AddCommentIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          {open ?
            <ChatBubbleOutlineIcon />
            :
            <ChatBubbleIcon />
          }

        </IconButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {comments.length === 0 && (
            <ListItem>
              <ListItemText >
                <Typography color="textSecondary">
                  No comments on this task yet.
                </Typography>
              </ListItemText>
            </ListItem>
          )}
          {comments && comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText>
                {`•\t${comment.text}`}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>

      <Dialog open={openAdd} onClose={closeCommentDialog}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Add a comnment to ${task.title}`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
          />
        </DialogContent>
        <Button onClick={handleCommentCreate} color="primary">
          Add Comment
        </Button>
      </Dialog>

    </>
  )
}
