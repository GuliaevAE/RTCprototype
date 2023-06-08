import React from 'react';
import { useAppDispatch } from '../../../store/hooks'
import { changeOriginalStaf } from '../../../store/slices/goodsSlice';
import { fetching } from '../api';

const Header = () => {
    const dispatch = useAppDispatch()
    // const originalStaf = useAppSelector(OriginalStaf)
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        const resData = await fetching(target.originalStaf_input.value)
        if (resData) {
            dispatch(changeOriginalStaf(resData))
        }
    }



    return (
        <header className='w-full pt-[1vmin]  flex relative z-[1] gap-4 flex-wrap'>
            <form onSubmit={event => submitHandler(event)} className='flex flex-auto gap-[10px] md:flex-none '>
                <input id='originalStaf_input' className='border-[.1px] border-solid border-[black] text-[white] bg-[black] px-2 rounded-[5px] w-full' placeholder='Идентификатор WB' type="text" />
                <button className='border-[.1px] border-solid border-[black] text-[black] rounded-[5px] p-1 px-2 '>Найти</button>
            </form>
           
            


        </header>
    );
};

export default Header; 