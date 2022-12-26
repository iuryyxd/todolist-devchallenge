import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

interface HeaderProps {
  page: string;
  handleAddTask: (a: string) => void;
}

function Header({ page, handleAddTask }: HeaderProps) {
  const [taskName, setTaskName] = useState("");

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (taskName === "") return alert("Escreva uma tarefa antes de enviar!");
    
    handleAddTask(taskName);
    setTaskName("");
  };

  return (
    <header className={styles.header}>
      <h1>#todo</h1>

      <nav className={styles.header__menu}>
        <Link to={"/"}>Todos</Link>
        <Link to={"/active"}>Ativos</Link>
        <Link to={"/completed"}>Concluidos</Link>
        <div className={`${styles.status} ${styles[page]}`}></div>
      </nav>

      <form name="addTaskForm" className={styles.header__form}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button form="addTaskForm" onClick={(e) => submitForm(e)}>
          Add
        </button>
      </form>
    </header>
  );
}

export default Header;
