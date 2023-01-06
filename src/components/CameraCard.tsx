import { Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MenuButton } from "./MenuButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type CameraCardProps ={
    buttonText?: string,
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
    textLabel?: string,
    defaultVal?: string,
    imageURL?: any,
    onTextChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    children: ReactNode,
    textRef?: React.MutableRefObject<string>,
    flgReadOnly?:boolean
}

export const CameraCard = (props:CameraCardProps) => {
    const { buttonText ="", onButtonClick = ()=> {}, textLabel="", defaultVal = "", imageURL, onTextChange = ()=> {}, children, textRef, flgReadOnly = false } = props

    return(
        <Card sx = {{width:"100%"}}>
            <Grid container
                display="flex"
                //   justifyContent= "center"
                alignItems="center"
                  // direction = "column"
                >
            <Grid item xs={5}>
                <Typography
                    component = "h2"
                    variant = "h6"
                    textAlign = "left"
                    sx = {{m:1, fontWeight : 'bold'}}
                    >
                    {children}
                </Typography>
            </Grid>
            <Grid item xs={7} sx = {{paddingInline:1}}>
                <MenuButton onClick = {onButtonClick} icon = {<CameraAltIcon />}>{buttonText}</MenuButton>
            </Grid>
            {imageURL !== "" && imageURL !== undefined &&
            <Grid item>
            <CardMedia component = "img" src = {imageURL} />
            </Grid>
            }
            <TextField
                id = {textLabel}
                placeholder = {textLabel}
                variant = "outlined"
                margin = "normal"
                fullWidth
                sx = {{ paddingInline:1}}
                onChange={onTextChange}
                defaultValue = {defaultVal}
                inputRef = {textRef}
                InputProps={{
                    readOnly: flgReadOnly,
                }}
            />
            </Grid>
        </Card>
    )
};