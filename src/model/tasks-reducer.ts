import type {TasksState} from '../app/App.tsx'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case "delete_todolist": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case "delete_task": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case "create_task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "change_task_status":{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        }
        case "change_task_title": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload} as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    return {type: 'create_task', payload} as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {type: 'change_task_status', payload} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return {type: 'change_task_title', payload} as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>