import { useEffect, useRef, useState } from "react";
import { useHooks } from "../hooks/hooks";
import { styles } from "../styles";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { MenuButton } from "../components/MenuButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from '@mui/icons-material/Close';
import { useInspectionHooks } from "../hooks/inspectionHooks";
import DeleteIcon from '@mui/icons-material/Delete';
import { NumberObj } from "../classes/NumberObj";

const CardForInspection = (props: {reset : boolean, setReqNumbers : React.Dispatch<React.SetStateAction<NumberObj[]>>}) => {
    const {reset, setReqNumbers} = props
    const { handleFiles, imageContainerRef, base64, inputFileRef, openDialog, resetSelection, objectURL } = useHooks();
    const didMountRef = useRef(false);
    const { numbers, setNumbers, count, handleEdit, addNumber, handleDelete } = useInspectionHooks();
    const [ openReset, setOpenReset ] = useState(false);

    function runOcr(){
        addNumber(base64.substr(2000,8));
        resetSelection();
    }

    function resetAll(){
        setNumbers([]);
    }

    useEffect(() => {
        if (base64 == ""){
            return
        } else {
            runOcr();
        }
    }, [base64]);

    useEffect(() => {
        if(!didMountRef.current){
            didMountRef.current = true;
        } else {
            resetAll();
        }
    }, [reset]);

    useEffect(()=>{
        setReqNumbers(numbers);
    },[numbers])

    return (
        <>
        <input
            type = "file"
            ref = {inputFileRef}
            accept = "image/*"
            onChange = {handleFiles}
            style = {{...styles.inputFile}}
        />
        <img ref={imageContainerRef} alt ="" />
        <Card sx = {{width:"100%"}}>
            <Grid container display="flex">
            <Grid item xs = {12}>
                <Typography
                    component = "h2"
                    variant = "h6"
                    textAlign = "left"
                    sx = {{m:1, fontWeight : 'bold'}}
                    >
                    ???????????????
                </Typography>
            </Grid>
            {numbers.map((number) => (
            <>
            <TextField
                id = "??????"
                placeholder = "??????"
                variant = "outlined"
                margin = "normal"
                fullWidth
                sx = {{ paddingInline:1}}
                InputProps={{
                    endAdornment: (number.deleteFlg?(<IconButton onClick = {() => handleDelete(number.id)}><CloseIcon /></IconButton>):(<></>))
                }}
                value={number.value}
                onChange={(e) => handleEdit(number.id, e.target.value)}
            />
            {number.deleteFlg && number.value !== '' &&
            <Grid item>
            <Typography textAlign="left" variant = "subtitle1" sx = {{color: 'error.main'}}>???????????????????????????</Typography>
            </Grid>
            }
            </>
            ))}
            <Grid container display = 'flex' alignItems='center'>
                <Grid item xs={7}>
                    <Typography
                        component = "h2"
                        variant = "subtitle1"
                        sx = {{m:1, fontWeight : 'bold'}}
                        >
                        ?????? {count} ?????????
                    </Typography>
                </Grid>
                <Grid item xs={5} sx = {{paddingInline:1}}>
                    {numbers.length > 0 &&
                    <Button
                        variant = "contained"
                        color = "secondary"
                        onClick = {() => {setOpenReset(true);}}
                        fullWidth
                        startIcon = {<DeleteIcon />}
                        >
                            ?????????
                        </Button>
                    }
                </Grid>
            </Grid>
            <Grid item xs = {12} sx = {{paddingInline:1}}>
                <MenuButton onClick = {openDialog} icon = {<CameraAltIcon />}>??????</MenuButton>
            </Grid>
            </Grid>
        </Card>
        <Dialog
            open = {openReset}
            onClose = {() => {}}
        >
            <DialogTitle>??????</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ??????????????????????????????????????????????????????
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick = {() => {setOpenReset(false)}}>?????????</Button>
                <Button onClick = {() => {
                    resetAll();
                    setOpenReset(false);
                }}>????????????</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
export default CardForInspection;