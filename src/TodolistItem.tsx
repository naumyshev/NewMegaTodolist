import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus
    } = props

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle !== ''){
            createTask(id, trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }

    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
                //createTask(id, taskTitle)
            createTaskHandler()
        }
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(id, taskId)
    }

    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
        setError(null)
    }

    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>, taskId: string) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(id, taskId, newStatusValue)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
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
                                <li className={task.isDone ? 'is-done': ''} key={task.id}>
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
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

