import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { BottomButton } from "../components/BottomButton";
import CustomDialog from "../components/CustomDialog";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import OcrCard from "./CardForOcr";

function Test({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const [openSuccess, setOpenSuccess ] = useState(false);
  const [openFailure, setOpenFailure ] = useState(false);
  const [num1, setNum1 ] = useState("");
  const [num1_ai, setNum1_ai ] = useState("");
  const [num2, setNum2 ] = useState("");
  const [num2_ai, setNum2_ai ] = useState("");
  const [ reset, setReset ] = useState(false);
  const [ errorText, setErrorText ] = useState("");

  const target = "YbhhGYuu";
  const error1 = "正：照合文字列と一致しません";
  const error2 = "誤：照合文字列と同じです";

  function runTest (){
    if (num1 === target && num2 !== "" && num2 !== target){
      setOpenSuccess(true);
    } else {
      if (num1 !== target && num2 === target){
        setErrorText(error1 + "\n" + error2);
      } else if (num1 !== target ){
        setErrorText(error1);
      } else {
        setErrorText(error2);
      }
      setOpenFailure(true);
    }
  }

  return (
    <>
      <Title>点検</Title>
      <UserName>{userName}</UserName>
      <Container component = "main" maxWidth = "xs">
          <Grid container
            rowSpacing = {1}
            display = "flex"
            direction = "column"
            >
            <Grid item>
            <Typography
                    component = "h2"
                    variant = "h6"
                    textAlign = "left"
                    sx = {{m:1, fontWeight : 'bold'}}
                    >
                    照合文字列：{target}
                </Typography>
            </Grid>
            <Grid item>
              <OcrCard flgReadOnly= {true} labelText = "読取文字列" setNumber = {setNum1} setNumberPredicted = {setNum1_ai} reset = {reset}>正</OcrCard>
            </Grid>
            <Grid item>
              <OcrCard flgReadOnly= {true} labelText = "読取文字列" setNumber = {setNum2} setNumberPredicted = {setNum2_ai} reset = {reset}>誤</OcrCard>
            </Grid>
            <Grid item>
              <Button
                // startIcon = {<LoginIcon />}
                variant = "contained"
                fullWidth
                size = "large"
                // sx = {{mt:1, mb:1}}
                onClick = {() => runTest()}>
                  点検
              </Button>
            </Grid>
          </Grid>
        </Container>
        <CustomDialog
          title = "点検OK"
          buttonText = "確認"
          // flagOnClose
          onClick = {()=>{
            setReset(!reset);
            setOpenSuccess(false);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "点検NG"
          text = {errorText}
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
  export default Test;