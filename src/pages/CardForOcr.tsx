import { ReactNode, useEffect, useRef } from "react";
import { CameraCard } from "../components/CameraCard";
import { useHooks } from "../hooks/hooks";
import { styles } from "../styles";

type CardForOcrProps ={
    labelText?: string,
    buttonText?: string,
    setNumber:React.Dispatch<React.SetStateAction<string>>,
    setNumberPredicted:React.Dispatch<React.SetStateAction<string>>,
    reset: boolean,
    children: ReactNode,
    flgReadOnly?: boolean
}

function CardForOcr(props:CardForOcrProps) {
    const { labelText = "製番", buttonText = "読取り", setNumber, setNumberPredicted, reset, children, flgReadOnly = false} = props
    const { handleFiles, imageContainerRef, base64, inputFileRef, openDialog, resetSelection, objectURL } = useHooks();
    const textRef = useRef<any>();
    const didMountRef = useRef(false);

    function runOcr(){
        setNumber(base64.substr(2000,8));
        textRef.current.value = base64.substr(2000,8);
        setNumberPredicted(base64.substr(2000,8));
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
            setNumber("");
            setNumberPredicted("");
            resetSelection();
            textRef.current.value = "";
        }
    }, [reset]);

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
        <CameraCard
            buttonText = {buttonText}
            onButtonClick = {openDialog}
            textLabel = {labelText}
            onTextChange = {(e) => setNumber(e.target.value)}
            imageURL = {objectURL}
            textRef = {textRef}
            flgReadOnly = {flgReadOnly}
            >
            {children}
        </CameraCard>
        </>
    );
}
export default CardForOcr;