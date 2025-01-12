import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskState = {
    [id: string]: TaskType[]
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Sugar', isDone: true}
        ]
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: filter} : td))
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const deleteTodolist = (id: string) => {
        setTodolists(todolists.filter(td => td.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        setTodolists([{id: todolistId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTodolistTitle = (id: string, title: string) => {
        setTodolists(todolists.map(td => td.id === id ? {...td, title} : td))
    }

    return (
        <div className="app">
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit">Sign in</Button>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container>
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
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}
