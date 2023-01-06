import React, { useEffect, useRef, useState } from "react";
import { BottomButton } from "../components/BottomButton";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import { CameraCard } from "../components/CameraCard";
import { useHooks } from "../hooks/hooks";
import { styles } from "../styles";
import CustomDialog from "../components/CustomDialog";
import OcrCard from "./CardForOcr";

function Collation({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const labels = [["大同現品票","東北命令書"],["大同現品票","東北現品票"],["東北命令書","東北現品票"]]
  const [openSuccess, setOpenSuccess ] = useState(false);
  const [openFailure, setOpenFailure ] = useState(false);
  const [num1, setNum1 ] = useState("");
  const [num1_ai, setNum1_ai ] = useState("");
  const [num2, setNum2 ] = useState("");
  const [num2_ai, setNum2_ai ] = useState("");
  const [ reset, setReset ] = useState(false);

  function runCollation (){
    if (num1 == num2){
      setOpenSuccess(true);
    } else {
      setOpenFailure(true);
    }
  }

  return (
      <>
        <Title>照合({labels[menu-1][0]}⇔{labels[menu-1][1]})</Title>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
          <Grid container
            rowSpacing = {1}
            display = "flex"
            direction = "column"
            >
            <Grid item>
              <OcrCard setNumber = {setNum1} setNumberPredicted = {setNum1_ai} reset = {reset}>{labels[menu-1][0]}</OcrCard>
            </Grid>
            { menu === 2 && num1_ai !== "" &&
            <Grid item>
            <Typography textAlign="left" variant = "subtitle1" sx = {{color: 'error.main'}}>※読取り用紙が違います</Typography>
            </Grid>
            }
            <Grid item>
              <OcrCard setNumber = {setNum2} setNumberPredicted = {setNum2_ai} reset = {reset}>{labels[menu-1][1]}</OcrCard>
            </Grid>
            <Grid item>
              <Button
                variant = "contained"
                fullWidth
                size = "large"
                onClick = {() => runCollation()}>
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
            setReset(!reset);
            setOpenSuccess(false);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "照合NG"
          text = '『不一致』  確認してください'
          buttonText = "解除"
          // flagOnClose
          onClick = {()=>{
            setOpenFailure(false);
          }}
          open = {openFailure}
        />
        <BottomButton icon = "" onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Collation;