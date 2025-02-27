import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [id: string]: TaskType[]
}

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')

export const createTaskAC = createAction<{title: string, todolistId: string}>('tasks/createTodolist')


export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')



export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})

