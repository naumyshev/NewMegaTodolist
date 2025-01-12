import Button from '@mui/material/Button'
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}:Props) => {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTaskTitle = title.trim()
        if (trimmedTaskTitle !== '') {
            onCreateItem( trimmedTaskTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createTaskHandler()
        }
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        setError(null)
    }

    return (
        <div>
            <TextField
                label={'Enter a title'}
                variant={'outlined'}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <Button variant={'contained'} onClick={createTaskHandler}>+</Button>
        </div>
    );
};
