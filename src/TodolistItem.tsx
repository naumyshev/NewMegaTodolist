import {CreateItemForm} from "./CreateItemForm.tsx";
import {Todolist} from "@/model/todolists-reducer.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id}
    } = props

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist} />
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={props.todolist} />
            <FilterButtons todolist={props.todolist} />
        </div>
    );
};
