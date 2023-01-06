import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { BottomButton } from "../components/BottomButton";
import { CameraCard } from "../components/CameraCard";
import CustomDialog from "../components/CustomDialog";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import OcrCard from "./CardForOcr";

function StorageRegister({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const [openSuccess, setOpenSuccess ] = useState(false);
  const [openFailure, setOpenFailure ] = useState(false);
  const [num1, setNum1 ] = useState("");
  const [num1_ai, setNum1_ai ] = useState("");
  const [num2, setNum2 ] = useState("");
  const [num2_ai, setNum2_ai ] = useState("");
  const [ reset, setReset ] = useState(false);

  function runRegister (){
    if (num1 !== "" && num2 !== ""){
      setOpenSuccess(true);
    } else {
      setOpenFailure(true);
    }
  }

  return (
    <>
      <Title>置場管理</Title>
      <UserName>{userName}</UserName>
      <Container component = "main" maxWidth = "xs">
          <Grid container
            rowSpacing = {1}
            display = "flex"
            direction = "column"
            >
            <Grid item>
              <OcrCard setNumber = {setNum1} setNumberPredicted = {setNum1_ai} reset = {reset}>現品票/命令書</OcrCard>
            </Grid>
            <Grid item>
              <OcrCard labelText = "置場名" setNumber = {setNum2} setNumberPredicted = {setNum2_ai} reset = {reset}>材料枠</OcrCard>
            </Grid>
            <Grid item>
              <Button
                // startIcon = {<LoginIcon />}
                variant = "contained"
                fullWidth
                size = "large"
                // sx = {{mt:1, mb:1}}
                onClick = {() => runRegister()}>
                  登録
              </Button>
            </Grid>
          </Grid>
        </Container>
        <CustomDialog
          title = "登録完了"
          text = {'『' + num2 + '』に登録'}
          buttonText = "確認"
          flagOnClose
          onClick = {()=>{
            setReset(!reset);
            setOpenSuccess(false);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "登録失敗"
          text = '入力値を確認してください'
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
  export default StorageRegister;