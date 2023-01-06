import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { BottomButton } from "../components/BottomButton";
import CustomDialog from "../components/CustomDialog";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import CardForInspection from "./CardForInspection";
import { NumberObj } from "../classes/NumberObj";

function Inspection({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const [openSuccess, setOpenSuccess ] = useState(false);
  const [openFailure, setOpenFailure ] = useState(false);

  const [ reset, setReset ] = useState(false);

  function executeInspection (){
    if (true){
      setOpenSuccess(true);
      setReset(true);
    } else {
      setOpenFailure(true);
    }
  }

  return (
      <>
        <Title>素材検品</Title>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
        <Grid container
          rowSpacing = {0.5}
          display = "flex"
          // direction = "column"
          justifyContent = "center"
          >
          <Grid item>
            <Typography component = "h1" variant = "h5"></Typography>
          </Grid>
          <Grid item>
            <CardForInspection reset = {reset} />
          </Grid>
          <Grid item xs = {6}>
            <Button
              // startIcon = {<LoginIcon />}
              variant = "contained"
              fullWidth
              size = "large"
              sx = {{mt:3}}
              onClick = {() => {executeInspection()}}>
                照合
            </Button>
          </Grid>
        </Grid>
      </Container>
      <CustomDialog
          title = "照合OK"
          buttonText = "確認"
          flagOnClose
          onClick = {()=>{
            setOpenSuccess(false);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "照合失敗"
          text = 'APIの呼び出しに失敗しました。通信状況を確認してください。'
          buttonText = "解除"
          // flagOnClose
          onClick = {()=>{
            setOpenFailure(false);
          }}
          open = {openFailure}
        />
        <BottomButton onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Inspection;