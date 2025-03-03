import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(td => {
                return (
                    <Grid key={td.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={td}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

