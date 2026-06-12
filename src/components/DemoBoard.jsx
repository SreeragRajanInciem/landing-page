"use client";

import React, { useState } from "react";
import { Plus, Clock, Trash2, CheckCircle2 } from "lucide-react";

export default function DemoBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Refactor auth notification middleware", column: "pending" },
    { id: 2, title: "Draft system roles permissions matrix", column: "pending" },
    { id: 3, title: "Optimize database index queries", column: "completed" },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            column: task.column === "pending" ? "completed" : "pending",
          };
        }
        return task;
      })
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      column: "pending",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id, e) => {
    e.stopPropagation(); // Stop task toggle on card click
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const pendingTasks = tasks.filter((task) => task.column === "pending");
  const completedTasks = tasks.filter((task) => task.column === "completed");

  return (
    <section id="demo" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Experience TaskFlow Live</h2>
          <p>Don't just read about it. Test our sandbox task board below. Complete, delete, or create cards to see transitions.</p>
        </div>

        {/* New Task Bar */}
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <form onSubmit={handleAddTask} className="demo-input-bar">
            <input 
              type="text" 
              placeholder="Type a task name (e.g. Test Docker configurations)..." 
              className="input-field" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0 20px" }}>
              <Plus size={20} />
            </button>
          </form>
        </div>

        {/* Task Board Container */}
        <div className="demo-board" style={{ maxWidth: "800px", margin: "30px auto 0 auto" }}>
          {/* Column 1: Active */}
          <div className="demo-column">
            <h3>
              Active Tasks 
              <span className="demo-badge">{pendingTasks.length}</span>
            </h3>
            
            {pendingTasks.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "14px", textAlign: "center", padding: "40px 0" }}>
                No active tasks. Add one above!
              </div>
            ) : (
              pendingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="demo-task-card"
                  onClick={() => handleToggleTask(task.id)}
                >
                  <div className="demo-task-info">
                    <div className="checkbox-custom">
                      <Clock size={12} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <span>{task.title}</span>
                  </div>
                  <button 
                    onClick={(e) => handleDeleteTask(task.id, e)} 
                    className="btn demo-task-action" 
                    style={{ background: "none", border: "none", padding: 0 }}
                    title="Delete Task"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Column 2: Completed */}
          <div className="demo-column">
            <h3>
              Completed Tasks 
              <span className="demo-badge">{completedTasks.length}</span>
            </h3>

            {completedTasks.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "14px", textAlign: "center", padding: "40px 0" }}>
                No completed tasks yet. Check an active task!
              </div>
            ) : (
              completedTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="demo-task-card completed"
                  onClick={() => handleToggleTask(task.id)}
                >
                  <div className="demo-task-info">
                    <div className="checkbox-custom checkbox-checked">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="line-through">{task.title}</span>
                  </div>
                  <button 
                    onClick={(e) => handleDeleteTask(task.id, e)} 
                    className="btn demo-task-action" 
                    style={{ background: "none", border: "none", padding: 0 }}
                    title="Delete Task"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
