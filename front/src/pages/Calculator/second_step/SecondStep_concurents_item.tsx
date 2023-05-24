import React, { useEffect } from 'react';
import Card from '../Card';
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Length, Width, Height, Commission, AveragePrice, Cost_price_to, Cost_price_from, deleteConcurent } from '../../../store/slices/goodsSlice';
import SecondStep_concurents_item_rent from './SecondStep_concurents_item_rent';
import Icon_cross from '../../../components/Icon_cross';


const SecondStep_concurents_item = ({ conc }: { conc: { index: string, name: string } }) => {
const dispatch = useAppDispatch()
    const [средняяЦена, setСредняяЦена] = useState<number>(0)

    return (
        <Card >
            <Icon_cross clickFunction={() => dispatch(deleteConcurent(conc.index))} />

            <div className='flex flex-col'>
                <div className='text-[0.7rem] flex flex-col'>
                    <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>{conc.index}</span>
                    <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>{conc.name}</span>
                    <div className='input_3d'>
                        <input className='w-full' type='number' onInput={(e: React.ChangeEvent<HTMLInputElement>) => setСредняяЦена(Number(e.target.value))}></input>
                    </div>
                </div>
                <div className='flex'>
                    <SecondStep_concurents_item_rent средняяЦена={средняяЦена} tag='from' />
                    <SecondStep_concurents_item_rent средняяЦена={средняяЦена} tag='to' />
                </div>
            </div>

        </Card>
    );
};

export default SecondStep_concurents_item;