import List from "@mui/material/List";
import {Todolist} from "@/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TaskItem} from "@/TaskItem.tsx";

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

