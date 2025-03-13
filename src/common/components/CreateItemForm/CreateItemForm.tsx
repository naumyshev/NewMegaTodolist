import { ChangeEvent, KeyboardEvent, useState } from "react"
import { TextField } from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTaskTitle = title.trim()
    if (trimmedTaskTitle !== "") {
      onCreateItem(trimmedTaskTitle)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createItemHandler()
    }
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setError(null)
  }

  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton onClick={createItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
