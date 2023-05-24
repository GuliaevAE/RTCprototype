import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { AnimSwitcher, OriginalStaf, changeAnimSwitcher, changeOriginalStaf } from '../store/slices/goodsSlice';
import { fetching } from '../pages/Calculator/api';

const Header = () => {
    const dispatch = useAppDispatch()
    const originalStaf = useAppSelector(OriginalStaf)
    const animSwitcher = useAppSelector(AnimSwitcher)
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        const resData = await   fetching(target.originalStaf_input.value)
        if (resData) {
            dispatch(changeOriginalStaf(resData))
        }
    }



    return (
        <header className='w-full pt-[3vmin] px-[5vmin] flex relative z-[1] gap-4 flex-wrap'>
            <form onSubmit={event => submitHandler(event)} className='flex flex-auto md:flex-none'>
                <input id='originalStaf_input' className='border-[.1px] border-solid border-[black] text-[white] bg-[black] px-2 rounded-l w-full' placeholder='Идентификатор WB' type="text" />
                <button className='border-[.1px] border-solid border-[black] text-[black] rounded-r p-1 px-2 '>Найти</button>
            </form>
            {originalStaf && <div className='header_links flex gap-4'>
                <div className=''>
                    <a target="_blank" href={originalStaf.links.link_wb} className='leading-[2rem]'>WB</a>
                </div>
                <div className=''>
                    <a target="_blank" href={originalStaf.links.link_mp} className='leading-[2rem]'>MP</a>
                </div>

            </div>}
            <div onClick={() => dispatch(changeAnimSwitcher())}
                className={`${animSwitcher ? 'bg-[black] text-[white]' : ' text-[black]'} border-solid border-[2px] border-[black] px-3 py-2 fixed top-[3vmin] right-[4vmin] font-[600] rounded-[5px]`}>
                <span>{animSwitcher ? 'ON' : 'OFF'}</span>
            </div>


        </header>
    );
};

export default Header; 