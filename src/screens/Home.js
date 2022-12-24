import React, { useState, useEffect } from 'react'
import ResponsiveDrawer from '../components/Dashboard';
import '../App.css'
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { push, ref, set, onValue, remove } from 'firebase/database';
import { database } from '../config/firebasemethod';
import { useLocation } from 'react-router-dom';

const Home = () => {

    const location = useLocation();

    const [inputData, setInputData] = useState("");
    const [list, setList] = useState([]);

    const addItem = () => {
        if (!inputData) {
            alert("Please Add Todo!")
        }
        else {
            const reference = ref(database, `todos/${location.state.id}`);
            const newRef = push(reference);
            set(newRef, {
                inputData,
                time: `${12 + new Date().getHours()}:${new Date().getMinutes()}`,
            })
            setInputData("");
        }
    }

    const deleteItem = () => {
        let reference = ref(database, "todos/");
        remove(reference)
        setList([])

    }

    const handleGetDatabase = () => {
        let reference = ref(database, "todos/");
        onValue(reference, (snapshot) => {
            // console.log(snapshot.val()[location.state.userName]);
            setList([...Object.values(snapshot.val()[location.state.id])]);
        });
    };

    useEffect(() => {
        handleGetDatabase();
    }, []);

    return (
        <>
            <ResponsiveDrawer />
            <div className="todo-main">
                <h2>Add Todo 🔥</h2>
                <Box
                    className='todo-input'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Add Todo" value={inputData} onChange={(e) => setInputData(e.target.value)} sx={{ width: '28ch' }} variant="outlined" />
                    <Button variant="contained" onClick={addItem} size='small' sx={{ height: '54px', width: '20ch' }}>Add</Button>
                    <Button variant="contained" onClick={deleteItem} size='small' sx={{ height: '54px', width: '20ch' }}>Delete All</Button>
                </Box>
                <h2>Your Todo's ✌</h2>
                <div className="list">
                    {
                        list.length > 0 &&
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {list.map((e, i) => {
                                return (
                                    <ListItem key={i}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <p>{i + 1}</p>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={e.inputData} secondary={e.time} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    }
                </div>
            </div>
        </>
    )
}

export default Home;