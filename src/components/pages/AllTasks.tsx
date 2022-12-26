import React, { useEffect, useState } from "react";
import { Task } from "../../App";
import styles from "./AllTasks.module.scss";
import { FiCheck } from 'react-icons/fi'

interface PagesProps {
  handlePage: (a: string) => void;
  tasks: Task[];
  handleCompleteTask: (a: string) => void;
}

function AllTasks({ handlePage, tasks, handleCompleteTask }: PagesProps) {
  useEffect(() => {
    handlePage("all");
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.tasks_list}>
        {tasks && tasks.map((task) => (
          <div className={styles.task} key={task.id}>
            <button onClick={() => handleCompleteTask(task.id)} className={task.isCompleted ? styles.completed : ''}>
              {task.isCompleted ? <FiCheck size={25} color="#fff"/> : <div />}
            </button>
            <span className={task.isCompleted ? styles.completed : ''}>{task.title}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AllTasks;
