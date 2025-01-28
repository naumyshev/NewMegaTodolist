import {Todolist} from "../App.tsx";
import {v1} from "uuid";

type Actions = DeleteTodolistAction | CreateTodolistAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(td => td.id !== action.payload.id)
        }

        case 'create_todolist': {
            return [...state, {id: action.payload.id, title: action.payload.title, isDone: false}]
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

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

