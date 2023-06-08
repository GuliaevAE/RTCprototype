import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { Curs_dol, Curs_uan, changeCurs_dol, changeCurs_uan } from '../../../store/slices/goodsSlice';

const FirstStep_calculator_curs = () => {
    const dispatch = useAppDispatch()
    const curs_dol = useAppSelector(Curs_dol)
    const curs_uan = useAppSelector(Curs_uan)

    const [dol_value, setDol] = useState<null | number>(null)
    const [uan_value, setUan] = useState<null | number>(null)

    const [message, setMessage] = useState<string>('')

    const saveCurs = () => {
        localStorage.setItem('dol', String(curs_dol))
        localStorage.setItem('uan', String(curs_uan))
        setMessage(' сохранен!')
    }
    useEffect(()=>{
        message&&setTimeout(()=>setMessage(''),1000)
    },[message])

    useEffect(() => {
        const saved_dol = localStorage.getItem('dol')
        const saved_uan = localStorage.getItem('uan')
        if (saved_dol) {
            dispatch(changeCurs_dol(Number(saved_dol)))
            setDol(Number(saved_dol))
        } else {
            setDol(curs_dol)
        }

        if (saved_uan) {
            dispatch(changeCurs_uan(Number(saved_uan)))
            setUan(Number(saved_uan))
        } else {
            setUan(curs_uan)
        }
    }, [dispatch])
    return (
        <>
            <div onClick={() => saveCurs()} className='absolute top-[0px] right-[0px] flex justify-center align-center text-[rgb(239, 239, 239)]'>
                <Icon height="20" icon="fluent:save-24-filled" className='' />
            </div>
            <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Курс {message}</span>
            {dol_value && <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Доллар
                </div>
                <div className='flex-1 flex'>
                    <div className='input_3d w-[100%]'><input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_dol(Number(e.target.value)))} defaultValue={dol_value} /></div>
                </div>
            </div>}
            {uan_value && <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Юаня
                </div>
                <div className='flex-1 flex'>
                    <div className='input_3d w-[100%]'>  <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_uan(Number(e.target.value)))} defaultValue={uan_value} /></div>
                </div>
            </div>}
        </>
    );
};

export default FirstStep_calculator_curs;