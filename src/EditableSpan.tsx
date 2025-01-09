import {ChangeEvent, useState} from "react";

type Props = {
    value: string
    onChange: (value: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const turnOnEditMode = () => {
        setIsEditMode(true);
    }

    const turnOffEditMode = () => {
        setIsEditMode(false);
        onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <>
            {isEditMode ? (
                <input
                    value={title}
                    onChange={changeTitle}
                    onBlur={turnOffEditMode}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};
