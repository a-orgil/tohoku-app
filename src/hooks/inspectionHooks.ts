import { useEffect, useState } from "react";
import { NumberObj } from "../classes/NumberObj";
import { v4 as uuid } from 'uuid';

export const useInspectionHooks = () => {
    const [ numbers, setNumbers ] = useState<NumberObj[]>([]);
    const [ checked, setChecked ] = useState(false);
    const [ count, setCount ] = useState(0);

    useEffect (() => {
        if (checked) {
            setChecked(!checked);
        } else {
            // console.log(numbers);
            let doubleCheck: string[] = [];
            let deepCopy = numbers.map((number) => ({ ...number }));

            deepCopy.map((number) => {
                if(doubleCheck.includes(number.value) || number.value === ''){
                    number.deleteFlg = true;
                } else {
                    number.deleteFlg = false;
                    doubleCheck.push(number.value);
                }
            });
            // console.log(deepCopy);
            setCount(doubleCheck.length);
            console.log(doubleCheck);
            console.log(count)
            setNumbers(deepCopy);
            setChecked(!checked);
        }
    }, [numbers])

    const addNumber = (firstValue: string) => {
        const newNumber: NumberObj = {
            id: uuid(),
            value: firstValue,
            valuePredicted: firstValue,
            deleteFlg: false
        };

        setNumbers([...numbers, newNumber]);
    };

    const handleEdit = (id: string, inputValue: string) => {
        const deepCopy = numbers.map((number) => ({ ...number }));

        let isDuplicated = false

        numbers.map(number => {
            if (number.value == inputValue){
                isDuplicated = true;
            }
        });

        const newNumbers = deepCopy.map((number) => {
            if (number.id === id) {
            number.value = inputValue;
            number.deleteFlg = isDuplicated;
            if(inputValue === ""){
                number.deleteFlg = true;
            }
            }
            return number;
        });

        setNumbers(newNumbers);
    };

    const handleDelete = (id: string) => {
        const newNumbers = numbers.filter((number) => number.id !== id);
        setNumbers(newNumbers);
    };

    return { numbers, setNumbers, count, handleEdit, addNumber, handleDelete };
};