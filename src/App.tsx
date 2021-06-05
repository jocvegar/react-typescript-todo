import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import TodoTask from "./components/TodoTask";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline,
    };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskName: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskName;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            value={deadline}
            placeholder="Deadline (in seconds)"
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((todo: ITask, idx: number) => {
          return <TodoTask key={idx} task={todo} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
