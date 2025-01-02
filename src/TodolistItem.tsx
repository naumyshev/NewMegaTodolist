import {FilterValues, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {

    const[taskTitle, setTaskTitle] = useState<string>("");

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <Button title={'+'} onClick={() => {
                    createTask(taskTitle)
                    setTaskTitle('')
                }
                }/>
            </div>
            {tasks.length === 0
                ? <p>No tasks</p>
                : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};

