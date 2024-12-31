import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValues>('all')

    let filteredTasks = tasks
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t=> t.id !== id))
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    return (
        <div className="app">
            <TodolistItem
                title={'uuu'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}
