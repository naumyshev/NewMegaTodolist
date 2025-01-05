import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t=> t.id !== id))
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(td=>td.id ===todolistId ? {...td, filter: filter} : td))
    }

    const createTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id == taskId ? { ...task, isDone } : task))
    }

    return (
        <div className="app">
            {todolists.map(td=> {

                let filteredTasks = tasks
                if(td.filter === 'active') {
                    filteredTasks = tasks.filter(t => !t.isDone)
                }
                if(td.filter === 'completed') {
                    filteredTasks = tasks.filter(t => t.isDone)
                }

                return(
                    <TodolistItem
                        key={td.id}
                        todolist={td}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
        </div>
    )
}
