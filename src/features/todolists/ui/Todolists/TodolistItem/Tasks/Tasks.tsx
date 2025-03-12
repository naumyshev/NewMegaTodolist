import List from "@mui/material/List";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";
import {useAppSelector} from "@/common/hooks";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter}=todolist

    const tasks = useAppSelector(selectTasks)
    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }



    return (
        <>
            {filteredTasks.length === 0
                ? <p>No tasks</p>
                : (
                    <List>
                        {filteredTasks.map(task => (
                            <TaskItem key={task.id} task={task} todolistId={id}/>
                        ))}
                    </List>
                )
            }
        </>
    );
};

