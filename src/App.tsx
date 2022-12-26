import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import ActiveTasks from "./components/pages/ActiveTasks";
import AllTasks from "./components/pages/AllTasks";
import CompletedTasks from "./components/pages/CompletedTasks";

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [pageName, setPageName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTaskAndSave(task: Task[]) {
    setTasks(task);
    localStorage.setItem("tasks", JSON.stringify(task));
  }

  function handleAddTask(taskName: string) {
    addTaskAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskName,
        isCompleted: false,
      },
    ]);
  }

  function handleCompleteTask(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    addTaskAndSave(newTasks);
  }

  function handleDeleteTask(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    addTaskAndSave(newTasks);
  }

  function handleDeleteAllTasks() {
    addTaskAndSave([]);
  }

  useEffect(() => {
    const tasksOnStorage = localStorage.getItem("tasks");
    if (!tasksOnStorage) {
      addTaskAndSave([]);
    } else {
      addTaskAndSave(JSON.parse(tasksOnStorage));
    }
  }, []);

  const handlePage = (name: string) => {
    setPageName(name);
  };

  return (
    <Router>
      <Header page={pageName} handleAddTask={handleAddTask} />
      <Routes>
        <Route
          path="/"
          element={
            <AllTasks
              handlePage={handlePage}
              tasks={tasks}
              handleCompleteTask={handleCompleteTask}
            />
          }
        />
        <Route
          path="/active"
          element={
            <ActiveTasks
              handlePage={handlePage}
              tasks={tasks}
              handleCompleteTask={handleCompleteTask}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <CompletedTasks
              tasks={tasks}
              handlePage={handlePage}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              handleDeleteAll={handleDeleteAllTasks}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
