import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t=> t.id !== id))
    }

    return (
        <div className="app">
            <TodolistItem
                title={'uuu'}
                tasks={tasks}
                deleteTask={deleteTask}
            />

        </div>
    )
}
