import { Card, CardContent, CardHeader, CardMedia, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MenuButton } from "./MenuButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { NumberObj } from "../classes/NumberObj";
import CloseIcon from '@mui/icons-material/Close';

type CameraCardForInspectionProps ={
    buttonText?: string,
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
    textLabel?: string,
    defaultVal?: string,
    imageURL?: any,
    onTextChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    children: ReactNode,
    textRef?: React.MutableRefObject<string>,
    flgReadOnly?:boolean,
    numbers: NumberObj[],
    setNumbers: React.Dispatch<React.SetStateAction<NumberObj[]>>
};

export const CameraCardForInspection = (props:CameraCardForInspectionProps) => {
    const { buttonText ="", onButtonClick = ()=> {}, textLabel="", defaultVal = "",
    imageURL, onTextChange = ()=> {}, children, textRef, flgReadOnly = false,
    numbers, setNumbers } = props

    const handleEdit = (id: string, inputValue: string) => {
        /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
        const deepCopy = numbers.map((number) => ({ ...number }));

        let isDuplicated = false

        numbers.map(number => {
            if (number.value == inputValue){
                isDuplicated = true;
            }
        });

        const newNumbers = deepCopy.map((number) => {
            if (number.id === id) {
            number.value = inputValue;
            number.deleteFlg = isDuplicated;
            }
            return number;
        });

        setNumbers(newNumbers);
    };

    const handleDelete = (id: string) => {
        const newNumbers = numbers.filter((number) => number.id !== id);
        setNumbers(newNumbers);
    };

    return(
        <Card sx = {{width:"100%"}}>
            <Grid container
                display="flex"
                // justifyContent= "center"
                // alignItems="center"
                // direction = "column"
                >
            <Grid item sx = {{flexGrow: 1}}>
                <Typography
                    component = "h2"
                    variant = "h6"
                    textAlign = "left"
                    sx = {{m:1, fontWeight : 'bold'}}
                    >
                    {children}
                </Typography>
            </Grid>
            {/* <Grid item xs={7} sx = {{paddingInline:1}}>
                <MenuButton onClick = {onButtonClick} icon = {<CameraAltIcon />}>{buttonText}</MenuButton>
            </Grid> */}
            {numbers.map((number) => (
            <>
            <TextField
                id = {textLabel}
                placeholder = {textLabel}
                variant = "outlined"
                margin = "normal"
                fullWidth
                sx = {{ paddingInline:1}}
                InputProps={{
                    readOnly: flgReadOnly,
                    endAdornment: (number.deleteFlg?(<IconButton onClick = {() => handleDelete(number.id)}><CloseIcon /></IconButton>):(<></>))
                }}
                value={number.value}
                onChange={(e) => handleEdit(number.id, e.target.value)}
            />
            {number.deleteFlg &&
            <Grid item>
            <Typography textAlign="left" variant = "subtitle1" sx = {{color: 'error.main'}}>　※重複しています</Typography>
            </Grid>
            }
            </>
            ))}
            <Grid item xs = {12} sx = {{paddingInline:1}}>
                <MenuButton onClick = {onButtonClick} icon = {<CameraAltIcon />}>{buttonText}</MenuButton>
            </Grid>
            </Grid>
        </Card>
    )
};