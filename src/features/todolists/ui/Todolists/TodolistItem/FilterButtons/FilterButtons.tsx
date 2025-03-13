import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { changeTodolistFilterAC, Todolist } from "@/features/todolists/model/todolists-reducer.ts"
import { FilterValues } from "@/app/App.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"

type Props = {
  todolist: Todolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
