
import type { RootState } from '../app/store'
import {TasksState} from "@/model/tasks-reducer.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks