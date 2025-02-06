import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [id: string]: TaskType[]
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

type ThemeMode = 'dark' | 'light'

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const deleteTodolist = (id: string) => {
        dispatchToTodolists(deleteTodolistAC(id))
        dispatchToTasks(deleteTodolistAC(id))
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id, title}))
    }

    const changeMode = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
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
            </div>
        </ThemeProvider>
    )
}
