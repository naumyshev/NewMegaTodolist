import Container from "@mui/material/Container";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import Grid from '@mui/material/Grid2'
import Paper from "@mui/material/Paper";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "@/model/todolists-reducer.ts";
import {FilterValues} from "@/app/App.tsx";
import {TodolistItem} from "@/TodolistItem.tsx";


export const Main = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const deleteTodolist = (id: string) => {
        dispatch(deleteTodolistAC({id}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }



    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <div>
                    <h3>Add New Todolist</h3>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </div>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(td => {
                    const todolistsTasks = tasks[td.id]
                    let filteredTasks = todolistsTasks
                    if (td.filter === 'active') {
                        filteredTasks = todolistsTasks.filter(t => !t.isDone)
                    }
                    if (td.filter === 'completed') {
                        filteredTasks = todolistsTasks.filter(t => t.isDone)
                    }

                    return (
                        <Grid key={td.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <TodolistItem
                                    key={td.id}
                                    todolist={td}
                                    tasks={filteredTasks}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    deleteTodolist={deleteTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};

