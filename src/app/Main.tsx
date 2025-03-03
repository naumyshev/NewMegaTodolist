import Container from "@mui/material/Container";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import Grid from '@mui/material/Grid2'
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";


export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <div>
                    <h3>Add New Todolist</h3>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </div>
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    );
};

