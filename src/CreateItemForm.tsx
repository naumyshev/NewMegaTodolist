import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}:Props) => {

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle !== '') {
            onCreateItem( trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
        setError(null)
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
            />
            <Button title={'+'} onClick={createTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
