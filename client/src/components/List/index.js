import React, { useState, useEffect } from 'react'

import Task from '../Task'

export default function List({ list }) {
  const { tasks } = list
  return (
    <div className="list">
      <div className="list__title">
        {list.title}
        <div>
          Add Task
        </div>
        <div>
          Edit Title
        </div>
        <div>
          Delete
        </div>
      </div>
      <div className="list__tasks">
        {tasks.map(task => <Task task={task} key={task.id} />)}
      </div>
    </div>
  )
}
