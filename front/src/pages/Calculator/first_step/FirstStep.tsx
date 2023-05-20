import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../store/hooks'
import { OriginalStaf } from '../../../store/slices/goodsSlice';

import FirstStep_WBrent from './FirstStep_WBrent';
import FirstStep_costCalculation from './FirstStep_costCalculation';


import Card from '../Card';
import FirstStep_mainCharasteristic from './FirstStep_mainCharasteristic';
import FirstStep_curs from './FirstStep_curs';
import FirstStep_missingCharasteristic from './FirstStep_missingCharasteristic';


const FirstStep_card = () => {
    const data = useAppSelector(OriginalStaf)

    const cardTitle = useRef<any>(null)

    const cardTitle_animation = () => {
        const target = cardTitle.current
        const letters = "ABCDEFGHILMNOPQRSTUVWXYZabcdefghilmnopqrstuvwxyz"
        let iterations = 0;
        const interval = setInterval(() => {
            target.innerText = target.innerText.split('')
                .map((_letter: string, index: number) => {
                    if (index < iterations) return target.dataset.value[index]
                    return letters[Math.floor(Math.random() * 48)]
                }).join('')

            if (iterations >= target.dataset.value.length) clearInterval(interval)

            iterations += 1
        }, 50)
    }

    useEffect(() => {
        cardTitle_animation()
    }, [])

    return (
        <article className='FirstStep_card relative flex flex-col gap-[10px] p-2  text-[grey]  text-[.8rem] '>
            <span data-value={data.imt_name} onClick={cardTitle_animation} ref={cardTitle} className='card_title text-[#fff7f7] font-[600] text-[1.8rem]'>{data && data.imt_name}</span>


            <div className='flex flex-col gap-[4vmin]'>
                <div className='card_title text-[1.2rem]'>
                    Первый этап
                </div>
                <div className=' flex gap-[4vmin] flex-wrap flex-col md:flex-row'>
                    <Card additionalClass='flex-1'>
                        <FirstStep_mainCharasteristic />
                    </Card>
                    <Card additionalClass=' flex-1 '>
                        <div className='  flex-1 flex flex-col  gap-1'>
                            <FirstStep_curs />
                        </div>
                        <div className='flex-1 flex flex-col      '>
                            <FirstStep_missingCharasteristic />
                        </div>
                    </Card>

                </div>
                <div className='flex gap-[4vmin] flex-col md:flex-row'>
                    <FirstStep_WBrent />
                    <FirstStep_costCalculation />

                </div>

            </div>



        </article>

    );
};

export default FirstStep_card;