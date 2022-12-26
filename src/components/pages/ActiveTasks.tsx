import React, { useEffect, useState } from "react";
import { Task } from "../../App";
import styles from "./AllTasks.module.scss";
import { FiCheck } from "react-icons/fi";

interface PagesProps {
  handlePage: (a: string) => void;
  tasks: Task[];
  handleCompleteTask: (a: string) => void;
}

function ActiveTasks({ handlePage, tasks, handleCompleteTask }: PagesProps) {
  useEffect(() => {
    handlePage("active");
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.tasks_list}>
        {tasks &&
          tasks.map(
            (task) =>
              task.isCompleted === false && (
                <div className={styles.task} key={task.id}>
                  <button onClick={() => handleCompleteTask(task.id)}></button>
                  <span>{task.title}</span>
                </div>
              )
          )}
      </div>
    </main>
  );
}

export default ActiveTasks;
