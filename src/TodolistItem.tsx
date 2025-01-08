import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist
    } = props

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(id, taskId)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(id, taskId, newStatusValue)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskHandler = (taskId: string) => {
        createTask(id, taskId)
    }

    return (
        <div>
            <div className="container">
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler} />
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
            {tasks.length === 0
                ? <p>No tasks</p>
                : (
                    <ul>
                        {tasks.map(task => {
                            return (
                                <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={(e) => {
                                            changeTaskStatusHandler(e, task.id)
                                        }}
                                    />
                                    <EditableSpan value={task.title} />
                                    <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};
