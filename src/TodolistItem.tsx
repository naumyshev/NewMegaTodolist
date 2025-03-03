import {FilterValues} from "./app/App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box'
import {containerSx} from './TodolistItem.styles'
import {changeTodolistFilterAC, Todolist} from "@/model/todolists-reducer.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";


type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {

    const {
        todolist: {id, filter}
    } = props

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist} />

            <CreateItemForm onCreateItem={createTask}/>

            <Tasks todolist={props.todolist} />

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
