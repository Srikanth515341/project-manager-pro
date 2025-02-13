import React from "react";
import "../styles.css";  // Fix the import path

const KanbanBoard = () => {
  return (
    <div className="kanban-board">
      {/* To-Do List */}
      <div className="kanban-list">
        <h2>To Do</h2>
        <div className="task-card">
          <h3>Task 1</h3>
          <p>Description of Task 1</p>
        </div>
      </div>

      {/* In Progress List */}
      <div className="kanban-list">
        <h2>In Progress</h2>
        <div className="task-card">
          <h3>Task 2</h3>
          <p>Description of Task 2</p>
        </div>
      </div>

      {/* Done List */}
      <div className="kanban-list">
        <h2>Done</h2>
        <div className="task-card">
          <h3>Task 3</h3>
          <p>Description of Task 3</p>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
