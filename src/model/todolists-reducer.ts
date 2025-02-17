import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, nanoid} from "@reduxjs/toolkit";

type Actions = CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'todolists/deleteTodolist': {
            return state.filter(td => td.id !== action.payload.id)
        }
        case 'create_todolist': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }
        case 'change_todolist_title': {
            return state.map(td => td.id === action.payload.id ? {...td, title: action.payload.title} : td)
        }

        case "change_todolist_filter": {
            return state.map(td => td.id === action.payload.id ? {...td, filter: action.payload.filter} : td)
        }

        default:
            return state
    }
}

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

