import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export const App = () => {
  return (
      <div className="app">
        <TodolistItem title={'uuu'}/>
        <TodolistItem />
        <TodolistItem />
      </div>
  )
}
