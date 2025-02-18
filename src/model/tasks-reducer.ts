import type {TasksState} from '../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
})

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')

export const createTaskAC = createAction('tasks/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskStatus')

