import React, { useEffect } from "react";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import { Task } from "../../App";

import styles from "./CompletedTask.module.scss";

interface PagesProps {
  handlePage: (a: string) => void;
  handleDeleteTask: (a: string) => void;
  handleCompleteTask: (a: string) => void;
  handleDeleteAll: () => void;
  tasks: Task[];
}

function CompletedTasks({
  handlePage,
  handleDeleteTask,
  tasks,
  handleCompleteTask,
  handleDeleteAll,
}: PagesProps) {
  useEffect(() => {
    handlePage("completed");
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.tasks_list}>
        {tasks &&
          tasks.map(
            (task) =>
              task.isCompleted === true && (
                <div className={styles.task} key={task.id}>
                  <div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className={task.isCompleted ? styles.completed : ""}
                    >
                      {task.isCompleted ? (
                        <FiCheck size={25} color="#fff" />
                      ) : (
                        <div />
                      )}
                    </button>
                    <span className={task.isCompleted ? styles.completed : ""}>
                      {task.title}
                    </span>
                  </div>

                  <FiTrash2
                    color="#BDBDBD"
                    size={18}
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              )
          )}
        {tasks.length > 0 &&
          tasks.some((task) => task.isCompleted === true) && (
            <button className={styles.delete_button} onClick={handleDeleteAll}>
              <FiTrash2 color="#fff" size={15} /> Deletar tudo
            </button>
          )}
      </div>
    </main>
  );
}

export default CompletedTasks;
