// import Circle from '../../components/Circle';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { OriginalStaf, changeAveragePrice, changeCommission, changeHeight, changeLength, changeOriginalStaf, changeRate_per_kg, changeWeight, changeWidth } from '../../store/slices/goodsSlice';

import FirstStep from './first_step/FirstStep';
import SecondStep from './second_step/SecondStep';
import { useEffect } from 'react';
import { fetching } from './api';
// import axios from 'axios';
import Header from './first_step/FirstStep_header';
const Calculator = () => {
    const originalStaf = useAppSelector(OriginalStaf)
    const dispatch = useAppDispatch()


    const { itemId } = useParams()

    useEffect(() => {
        if (itemId) {
            console.log(itemId)
            const index = itemId.split('-')[0]
            fetching(index).then(res => dispatch(changeOriginalStaf(res)))

        } else {
            dispatch(changeOriginalStaf(null))
        }
    }, [dispatch, itemId])


    useEffect(() => {
        if (!originalStaf) {
            dispatch(changeHeight(0))
            dispatch(changeLength(0))
            dispatch(changeWidth(0))
            dispatch(changeWeight(0))
            dispatch(changeRate_per_kg(0))
            dispatch(changeCommission(0))
            dispatch(changeAveragePrice(0))
            // dispatch(changePurchasePrice(0))
            dispatch(changeRate_per_kg(0))
        }



    }, [dispatch, originalStaf])


    return (
        <div className='py-[3vmin] px-[5vmin]'>
            {!itemId && <Header />}
            {/* <Circle /> */}
            {originalStaf && <FirstStep />}
            {originalStaf && <SecondStep />}
        </div>
    );
};

export default Calculator;