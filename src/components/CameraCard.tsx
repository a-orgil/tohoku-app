import { Card, Grid, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MenuButton } from "./MenuButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type CameraCardProps ={
    buttonText?: string,
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
    textLabel?: string,
    onTextChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    children: ReactNode
}

export const CameraCard = (props:CameraCardProps) => {
    const { buttonText ="", onButtonClick = ()=> {}, textLabel="", onTextChange = ()=> {}, children } = props

    return(
        <Card sx = {{width:"100%"}}>
            <Grid container
                display="flex"
                  // justifyContent= "center"
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
            <TextField
                id = {textLabel}
                label = {textLabel}
                variant = "outlined"
                margin = "normal"
                fullWidth
                sx = {{ paddingInline:1}}
                onChange={onTextChange}
            />
            </Grid>
        </Card>
    )
};