import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Todolist} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter}=todolist

    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    const deleteTask = (taskId: string) => {
        dispatch(deleteTaskAC({todolistId:id, taskId}))
    }

    return (
        <>
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
        </>
    );
};

