import {FilterValues, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValues
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle !== ''){
            createTask(trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }

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
        setError(null)
    }

    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>, id: string) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(id, newStatusValue)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className="error-message">{error}</div>}
            </div>
            {tasks.length === 0
                ? <p>No tasks</p>
                : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={(e)=>{changeTaskStatusHandler(e, task.id)}}
                                    />
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}title={'Active'} onClick={() => changeFilter('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};

