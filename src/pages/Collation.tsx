import React from "react";
import { BottomButton } from "../components/BottomButton";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";
import { CameraCard } from "../components/CameraCard";

function Collation({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const labels = [["大同現品票","東北命令書"],["大同現品票","東北現品票"],["東北命令書","東北現品票"]]
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
              <CameraCard
                buttonText = "読取り"
                onButtonClick = {()=> {console.log("button clicked");}}
                textLabel = "製番"
                onTextChange = {()=>{console.log("text changed");}}>
                {labels[menu-1][0]}
              </CameraCard>
            </Grid>
            <Grid item>
              <CameraCard
                buttonText = "読取り"
                onButtonClick = {()=> {console.log("button clicked");}}
                textLabel = "製番"
                onTextChange = {()=>{console.log("text changed");}}>
                {labels[menu-1][1]}
              </CameraCard>
            </Grid>
            <Grid item>
              <Button
                // startIcon = {<LoginIcon />}
                variant = "contained"
                fullWidth
                size = "large"
                // sx = {{mt:1, mb:1}}
                onClick = {() => {}}>
                  照合
              </Button>
            </Grid>
          </Grid>
        </Container>
        <BottomButton icon = "" onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Collation;