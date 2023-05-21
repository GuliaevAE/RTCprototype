import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { Curs_dol, Curs_uan, changeCurs_dol, changeCurs_uan } from '../../../store/slices/goodsSlice';

const FirstStep_calculator_curs = () => {
    const dispatch = useAppDispatch()
    const curs_dol = useAppSelector(Curs_dol)
    const curs_uan = useAppSelector(Curs_uan)

    const saveCurs = () => {
        localStorage.setItem('dol', String(curs_dol))
        localStorage.setItem('uan', String(curs_uan))
        console.log('curs saved')
    }


    useEffect(() => {
        const saved_dol = localStorage.getItem('dol')
        const saved_uan = localStorage.getItem('uan')
        saved_dol && dispatch(changeCurs_dol(Number(saved_dol)))
        saved_uan && dispatch(changeCurs_uan(Number(saved_uan)))
    }, [dispatch])
    return (
        <>
            <div onClick={() => saveCurs()} className='absolute top-[0px] right-[0px] flex justify-center align-center text-[rgb(239, 239, 239)]'>
                <Icon height="18" icon="ic:save" className='' />
            </div>
            <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Курс</span>
            <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Доллар
                </div>
                <div className='flex-1 flex'>
                    <div className='input_3d w-[100%]'><input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_dol(Number(e.target.value)))} defaultValue={curs_dol ? curs_dol : ''} /></div>
                </div>
            </div>
            <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Юаня
                </div>
                <div className='flex-1 flex'>
                    <div className='input_3d w-[100%]'>  <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_uan(Number(e.target.value)))} defaultValue={curs_uan ? curs_uan : ''} /></div>
                </div>
            </div>
        </>
    );
};

export default FirstStep_calculator_curs;