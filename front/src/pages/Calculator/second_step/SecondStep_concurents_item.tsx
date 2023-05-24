import React from 'react';
import Card from '../Card';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks'
import { deleteConcurent } from '../../../store/slices/goodsSlice';
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