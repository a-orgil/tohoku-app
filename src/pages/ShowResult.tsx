import { Result } from "../classes/Result";

function ShowResult() {
    const result:Result[] = [
        {value:'num1', result:1},
        {value:'num2', result:2},
        {value:'num3', result:3},
        {value:'num4', result:4, timestamp:'xxxxx'}
    ]

    return (
    <>
      {result.map(number =>{
          console.log(number.value + ':'+ number.result)
        })}
    </>
    );
  }
  
  export default ShowResult;
  