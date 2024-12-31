import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    const tasks = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 3, title: 'Redux', isDone: false }
    ]

  return (
      <div className="app">
        <TodolistItem title={'uuu'} tasks={tasks}/>

      </div>
  )
}
