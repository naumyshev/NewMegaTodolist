import {Todolist} from "../App.tsx";
import {v1} from "uuid";

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(td => td.id !== action.payload.id)
        }
        case 'create_todolist': {
            return [...state, {id: action.payload.id, title: action.payload.title, isDone: false}]
        }
        case 'change_todolist_title': {
            return state.map(td => td.id === action.payload.id ? {...td, title: action.payload.title} : td)
        }

        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: "delete_todolist", payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {title, id: v1()}} as const
}

export const changeTodolistTitleAC = (payload:{id: string, title: string}) => {
    return {type: 'change_todolist_title', payload } as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

