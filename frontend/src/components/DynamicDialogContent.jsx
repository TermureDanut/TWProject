import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import GOAT from './gaot.jpg';
import './DynamicDialogStyle.css';

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
        <DialogContent className= "dialogdyn">
            <DialogContentText className="dialog-text">
                Waiting for another player{dots}
            </DialogContentText>

            <DialogContentText className="dialog-text">
                Meanwhile enjoy this picture of the GOAT
            </DialogContentText>

            <img src ={GOAT} alt="Descriptive Text" className="dialog-image" />


        </DialogContent>
    );
}

export default DynamicDialogContent;
