import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";


type Props = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
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

    const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle(id, title)
    }

    return (
        <div>
            <div className="container">
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0
                ? <p>No tasks</p>
                : (
                    <ul>
                        {tasks.map(task => {

                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }

                            return (
                                <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                        onChange={(e) => {
                                            changeTaskStatusHandler(e, task.id)
                                        }}
                                    />
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    <IconButton onClick={() => deleteTaskHandler(task.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </div>
        </div>
    );
};
