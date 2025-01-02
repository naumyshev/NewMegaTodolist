import {FilterValues, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>("");

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
                createTask(taskTitle)
        }
    }

    const deleteTaskHandler = (id: string) => {
        deleteTask(id)
    }

    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'} onClick={createTaskHandler}/>
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
                                    <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
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

