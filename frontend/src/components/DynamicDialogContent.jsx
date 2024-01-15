import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import GOAT from './gaot.jpg';

function DynamicDialogContent() {
    const image = GOAT;
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => prevDots.length < 3 ? prevDots + '.' : '');
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    return (
        <DialogContent>
            <DialogContentText>
                Waiting for another player{dots}
            </DialogContentText>

            <DialogContentText>
                Meanwhile enjoy this picture of the GOAT
            </DialogContentText>

            <img src ={GOAT} alt="Descriptive Text" style={{ width: '60%', height: '60%', marginTop: '20px', marginLeft: '20%' }} />


        </DialogContent>
    );
}

export default DynamicDialogContent;
