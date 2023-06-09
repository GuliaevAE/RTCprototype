import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { AddedConcurents, OriginalStaf, TConcurent } from '../../../store/slices/goodsSlice';
import axios from 'axios';
import SecondStep_concurents_image from './SecondStep_concurents_image';
import { Icon } from '@iconify/react';
import SecondStep_concurents_item from './SecondStep_concurents_item';
// import SecondStep_concurents_item2 from './SecondStep_concurents_item2';


const SecondStep_concurents = () => {
    const originalStaf = useAppSelector(OriginalStaf)
    const [concurents, setConcurents] = useState<number[]>([])
    const [concurentsPage, setPage] = useState<number>(0)
    const addedConcurents = useAppSelector(AddedConcurents)
    useEffect(() => {
        if (originalStaf) {
            axios.get(`https://in-visual-similar.wildberries.ru/?nm=${originalStaf.nm_id}`)
                .then(res => setConcurents(res.data))
        }
    }, [originalStaf])

    const visibleConcurents = useMemo(() => concurents.slice(concurentsPage, concurentsPage + 4), [concurents, concurentsPage])

    return (
        <>
            <div className='card_title text-[1.2rem]'>
                Поиск конкурентов
            </div>
            <div className='flex text-[black] gap-2'>

                <div className='flex flex-col '>
                    <div className='bg-[] flex justify-center mb-2 border-b-[1px] border-solid border-[black]'>
                        <span>Оригинал</span>
                    </div>
                    <SecondStep_concurents_image index={originalStaf.nm_id} />
                </div>
                <div className='flex-auto flex flex-col '>
                    <div className='bg-[] flex justify-center mb-2 border-b-[1px] border-solid border-[black]'>
                        <span>Конкуренты {concurents.length?'('+(concurentsPage+1)+'-'+(concurentsPage+4)+' из '  +concurents.length+'шт)':''}</span>
                    </div>
                    <div className='flex  justify-between h-full'>
                        <div className={`flex cursor-pointer ${!(concurentsPage > 1) && 'opacity-0'}`} onClick={() => concurentsPage > 1 && setPage(prev => prev - 4)}>
                            <Icon icon="ant-design:left-outlined" className='self-center h-full' width={'5vw'} />
                        </div>
                        {visibleConcurents.map(conc => <SecondStep_concurents_image index={String(conc)} />)}

                        <div className={`flex cursor-pointer ${!(concurentsPage+4 < concurents.length) && 'opacity-0'}`} onClick={() => concurentsPage+4 < concurents.length && setPage(prev => prev + 4)}>
                            <Icon icon="ant-design:right-outlined" className='self-center h-full' width={'5vw'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-[4vmin] mt-2'>
                {addedConcurents && addedConcurents.map((conc: TConcurent) => <SecondStep_concurents_item conc={conc} />)}
            </div>
        </>
    );
};

export default SecondStep_concurents;