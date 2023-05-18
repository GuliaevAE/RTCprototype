import axios from 'axios';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { OriginalStaf, changeOriginalStaf } from '../store/slices/goodsSlice';

const Header = () => {
    const dispatch = useAppDispatch()
    const originalStaf = useAppSelector(OriginalStaf)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget
        console.log(target.originalStaf_input.value)

        const all = target.originalStaf_input.value
        const part = target.originalStaf_input.value.slice(0, target.originalStaf_input.value.length - 3)
        const vol = target.originalStaf_input.value.slice(0, target.originalStaf_input.value.length - 5)



        for (let i = 1; i <= 10; i++) {
            const ind = String(i).length === 1 ? '0' + i : i
            try {
                const res = await axios.get(`https://basket-${ind}.wb.ru/vol${vol}/part${part}/${all}/info/ru/card.json`)
                res.data.links = { link_wb: `https://www.wildberries.ru/catalog/${all}/detail.aspx`, link_mp: `https://mpstats.io/wb/item/${all}` }
                return dispatch(changeOriginalStaf(res.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <header className='w-full pt-[3vmin] px-[5vmin] flex relative z-[1] gap-4'>
            <form onSubmit={event => submitHandler(event)} className='flex'>
                <input id='originalStaf_input' className='border-[.1px] border-solid border-[white] text-[white] bg-[black] px-2 rounded-l' placeholder='Идентификатор WB' type="text" />
                <button className='border-[.1px] border-solid border-[white] rounded-r p-1 px-2 '>Найти</button>
            </form>
            {originalStaf && <div className='header_links flex gap-[2vmin]'>
                <div className=''>
                    <a target="_blank" href={originalStaf.links.link_wb} className='leading-[2rem]'>WB</a>
                </div>
                <div className=''>
                    <a target="_blank" href={originalStaf.links.link_mp} className='leading-[2rem]'>MP</a>
                </div>

            </div>
            }

        </header>
    );
};

export default Header; 