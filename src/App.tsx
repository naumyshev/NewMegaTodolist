import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValues>('all')

    let filteredTasks = tasks
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t=> t.id !== id))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const createTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id == taskId ? { ...task, isDone } : task))
    }

    return (
        <div className="app">
            <TodolistItem
                title={'uuu'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    )
}
