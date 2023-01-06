import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { BottomButton } from "../components/BottomButton";
import { CameraCard } from "../components/CameraCard";
import CustomDialog from "../components/CustomDialog";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import OcrCard from "./CardForOcr";

function StorageSearch({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const [openSuccess, setOpenSuccess ] = useState(false);
  const [openFailure, setOpenFailure ] = useState(false);

  const [num1, setNum1 ] = useState("");
  const [num1_ai, setNum1_ai ] = useState("");

  const [ reset, setReset ] = useState(false);

  const target = "YbhhGYuu";

  function runSearch (){
    if (num1 === target){
      setOpenSuccess(true);
    } else {
      setOpenFailure(true);
    }
  }

  return (
    <>
      <Title>置場確認</Title>
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
            <Button
              variant = "contained"
              fullWidth
              size = "large"
              onClick = {() => runSearch()}>
                検索
            </Button>
          </Grid>
        </Grid>
      </Container>
      <CustomDialog
          title = "検索完了"
          text= "検索結果『XXX』"
          buttonText = "確認"
          // flagOnClose
          onClick = {()=>{
            setReset(!reset);
            setOpenSuccess(false);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "検索失敗"
          text = '製番を確認してください'
          buttonText = "確認"
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
  export default StorageSearch;