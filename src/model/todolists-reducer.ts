import {Todolist} from "../App.tsx";

export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

type Actions = DeleteTodolistAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(td => td.id !== action.payload.id)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string): DeleteTodolistAction => {
    return {type: "delete_todolist", payload: {id}} as const
}