import {FilterValues} from "./app/App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from './TodolistItem.styles'
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id, title, filter}
    } = props

    const tasks = useAppSelector(selectTasks)
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    const dispatch = useAppDispatch()

    const deleteTask = (taskId: string) => {
        dispatch(deleteTaskAC({todolistId:id, taskId}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div>
            <div className="container">
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitle}/>
                </h3>
                <IconButton onClick={deleteTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTask}/>
            {filteredTasks.length === 0
                ? <p>No tasks</p>
                : (
                    <List>
                        {filteredTasks.map(task => {
                            const changeTaskTitle = (title: string) => {
                                dispatch(changeTaskTitleAC({todolistId:id, taskId: task.id, title}))
                            }

                            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
                            }

                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}>
                                    <div>
                                        <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                                    </div>
                                    <IconButton onClick={() => deleteTask(task.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                )
            }

            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilter('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilter('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilter('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};
