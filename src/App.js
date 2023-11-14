import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import "./App.css"
import {useLanguage} from "./context/LanguageContext"
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";


function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const { language, switchLanguage } = useLanguage();
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
      dueDate: newDueDate, // Add dueDate property
    };
    const updatedTasks = [...tasks, newTaskObj];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setNewTask('');
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const filterNotFinishedTasks = () => {
    return showNotFinishedOnly ? tasks.filter((task) => !task.completed) : tasks;
  };

  const incompleteCount = tasks.filter((task) => !task.completed).length;


  const daysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffInTime = due.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  return (
    <>
    <div className='container'>
      <div className='header'>{language === 'en' ? 'You have' : 'Bạn còn'} {incompleteCount} {language === 'en' ? 'task left!' : 'công việc'}</div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={showNotFinishedOnly}
            onChange={() => setShowNotFinishedOnly(!showNotFinishedOnly)}
          />
          {language === 'en' ? 'Show Not Finished Only' : 'Chỉ Hiển Thị Công Việc Chưa Hoàn Thành'}
        </label>
      </div>
      <ul className='todo-list-container'>
        {filterNotFinishedTasks().map((task) => (
          <li key={task.id} className={`todo-item-container ${task.completed ? "done" : ""}`}>
            {!task.completed ? (
              <FaRegCircle
                onClick={() => toggleCompletion(task.id)}
                className="item-done-button"
                color="#9a9a9a"
              />
            ) : (
              <FaRegCheckCircle
                onClick={() => toggleCompletion(task.id)}
                color="#9a9a9a"
                className="item-done-button"
              />
            )}
            <div className="item-title">{task.title}</div>
            {' '}
            {task.dueDate && (
              <>
               ({daysUntilDue(task.dueDate)} {language === 'en' ? 'day left' : 'ngày nữa'})
              </>
            )}
            <button className='delete-btn' onClick={() => deleteTask(task.id)}>{language === 'en' ? 'Delete' : 'Xoá'}</button>
          </li>
        ))}
      </ul>

              

      <div className='form'>
        <div className='input-form'>
          <input
            type="text"
            value={newTask}
            placeholder='Enter task...'
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
        </div>
        <button onClick={addTask}>{language === 'en' ? 'Submit' : 'Thêm'}</button>
      </div>
     
    </div>
    <div>
      <h3>{language === 'en' ? 'Made by MindX':'Tạo bởi MindX'} 🔥</h3>
      <div>
        <span>{language === 'en' ? 'Available on:' : 'Có sẵn trên:'}</span>
        <span onClick={()=>switchLanguage('vi')} className={language === 'vi' ? 'languague-picker selected' : 'languague-picker'}>🇻🇳</span>
        <span onClick={()=>switchLanguage('en')} className={language === 'en' ? 'languague-picker selected' : 'languague-picker'}>🇺🇸</span>
      </div>
    </div>
    </>
  );
}

function App() {
  return (
    <div className='App'>

      <Router>
        <Routes>
          <Route path="/" exact element={<TaskApp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
