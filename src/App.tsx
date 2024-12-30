import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]

    const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
    ]

  return (
      <div className="app">
        <TodolistItem title={'uuu'} tasks={tasks1}/>
        <TodolistItem title={'aaa'} tasks={tasks2}/>
      </div>
  )
}
