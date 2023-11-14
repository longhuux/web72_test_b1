import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, index, moveTask }) => {
  const [, drag] = useDrag({
    item: { type: 'TASK', id: task.id, index },
  });

  return (
    <div ref={drag} style={{ cursor: 'move' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => moveTask(task.id, 'completed')}
      />
      {task.title}
      {task.dueDate && ` - Due Date: ${task.dueDate}`}
    </div>
  );
};

export default TaskItem;
