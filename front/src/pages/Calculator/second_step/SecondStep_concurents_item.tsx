import React from 'react';
import Card from '../Card';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks'
import { TConcurent, deleteConcurent } from '../../../store/slices/goodsSlice';
import SecondStep_concurents_item_rent from './SecondStep_concurents_item_rent';
import Icon_cross from '../../../components/Icon_cross';


const SecondStep_concurents_item = ({ conc }: { conc: TConcurent }) => {
    const dispatch = useAppDispatch()
    const [средняяЦена, setСредняяЦена] = useState<number>(0)

    return (
        <Card>
            <Icon_cross clickFunction={() => dispatch(deleteConcurent(conc.index))} />

            <div className='flex flex-col'>
                <div className='text-[0.7rem] flex flex-col relative z-[1]'>
                    <div className='header_links flex  gap-5 w-[fit-content]'>
                        <div className=''>
                            <a target="_blank" href={conc.links.link_wb} className='leading-[2rem]'>WB</a>
                        </div>
                        <div className=''>
                            <a target="_blank" href={conc.links.link_mp} className='leading-[2rem]'>MP</a>
                        </div>
                        <span className='self-center font-[700] text-[.9rem]'>{conc.index}</span>
                    </div>
                    <span className=' font-[700] text-[.9rem]'>{conc.name}</span>
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