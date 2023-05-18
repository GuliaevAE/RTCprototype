import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { OriginalStaf, Weight, Length, Width, Height, Volume, changeVolume, changePurchasePrice, Curs_dol, Curs_uan, changeCurs_dol, changeCurs_uan } from '../../store/slices/goodsSlice';
import { changeWeight, changeLength, changeWidth, changeHeight, changeCommission, changeAveragePrice } from '../../store/slices/goodsSlice';

import FirstStep_card_table_WBrent from './FirstStep_card_table_WBrent';
import FirstStep_card_costCalculation from './FirstStep_card_costCalculation';

import { Icon } from '@iconify/react';
import { cardHoverFunction, cardLeaveFunction } from '../../animations/cardAnimations';


interface IDataOption_item {
    name: string,
    value: string
}


const FirstStep_card = () => {
    const data = useAppSelector(OriginalStaf)

    const weight = useAppSelector(Weight)

    const length = useAppSelector(Length)
    const width = useAppSelector(Width)
    const height = useAppSelector(Height)
    const volume = useAppSelector(Volume)

    const dispatch = useAppDispatch()

    const inputHandler_length = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeLength(Number(e.target.value)))
    const inputHandler_width = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeWidth(Number(e.target.value)))
    const inputHandler_height = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeHeight(Number(e.target.value)))


    const dimensions = (options: { name: string, value: string }[]) => {
        const arr: { name: string, value: string }[] = []
        const subArr: string[] = ['Длина упаковки', 'Ширина упаковки', 'Высота упаковки']
        subArr.forEach(characteristic => {
            const target = options.find((x: IDataOption_item) => x.name === characteristic)
            if (target) arr.push(target)
        })
        return arr
    }



    const missingСharacteristics = (options: { name: string, value: string }[]) => {
        const arr: string[] = []
        !options.find((x: IDataOption_item) => x.name === 'Вес товара с упаковкой (г)') && !options.find((x: IDataOption_item) => x.name === 'Вес товара без упаковки (г)') && arr.push('Вес товара')
        !options.find((x: IDataOption_item) => x.name === 'Длина упаковки') && arr.push('Длина упаковки')
        !options.find((x: IDataOption_item) => x.name === 'Ширина упаковки') && arr.push('Ширина упаковки')
        !options.find((x: IDataOption_item) => x.name === 'Высота упаковки') && arr.push('Высота упаковки')
        return arr

    }


    useEffect(() => {
        length && width && height && dispatch(changeVolume(length * 0.01 * width * 0.01 * height * 0.01))
    }, [length, width, height, dispatch])

    useEffect(() => {
        if (data) {
            if (data.options.find((x: IDataOption_item) => x.name === 'Вес товара с упаковкой (г)')) {
                dispatch(changeWeight(+data.options.find((x: IDataOption_item) => x.name === 'Вес товара с упаковкой (г)').value.split(' ')[0]))
            } else if (data.options.find((x: IDataOption_item) => x.name === 'Вес товара без упаковки (г)')) {
                dispatch(changeWeight(+data.options.find((x: IDataOption_item) => x.name === 'Вес товара без упаковки (г)').value.split(' ')[0] + 40))
            } else {
                dispatch(changeWeight(0))
            }

            data.options.find((x: IDataOption_item) => x.name === 'Длина упаковки') ?
                dispatch(changeLength(+data.options.find((x: IDataOption_item) => x.name === 'Длина упаковки').value.split(' ')[0]))
                : dispatch(changeLength(0))
            data.options.find((x: IDataOption_item) => x.name === 'Ширина упаковки') ?
                dispatch(changeWidth(+data.options.find((x: IDataOption_item) => x.name === 'Ширина упаковки').value.split(' ')[0]))
                : dispatch(changeWidth(0))
            data.options.find((x: IDataOption_item) => x.name === 'Высота упаковки') ?
                dispatch(changeHeight(+data.options.find((x: IDataOption_item) => x.name === 'Высота упаковки').value.split(' ')[0]))
                : dispatch(changeHeight(0))
        }


        dispatch(changeCommission(0))
        dispatch(changeAveragePrice(0))
        dispatch(changePurchasePrice(0))
    }, [data, dispatch])



    const curs_dol = useAppSelector(Curs_dol)
    const curs_uan = useAppSelector(Curs_uan)

    const saved_dol = localStorage.getItem('dol')
    const saved_uan = localStorage.getItem('uan')

    saved_dol && dispatch(changeCurs_dol(Number(saved_dol)))
    saved_uan && dispatch(changeCurs_uan(Number(saved_uan)))

    const saveCurs = () => {
        localStorage.setItem('dol', String(curs_dol))
        localStorage.setItem('uan', String(curs_uan))
    }


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

            <div className='flex'>
                <div className='flex-1 rounded-[5px]  flex flex-col gap-[4vmin] w-full'>
                    <div className=' flex gap-[4vmin] flex-wrap'>
                        <div onMouseMove={cardHoverFunction} onMouseLeave={cardLeaveFunction} className=' background_shadow_animation flex-1 flex flex-col  p-2 '>
                            <span className='text-[rgb(239, 239, 239)] font-[700]  '>Основные параметры</span>


                            <div className='flex inputBox'>
                                <div className='w-[50%]'>
                                    Габариты (см)
                                </div>
                                <div className='flex-1 flex gap-1'>
                                    <input onInput={inputHandler_length} type="number" className='w-[100%] ' defaultValue={length ? length : ''} />
                                    <input onInput={inputHandler_width} type="number" className='w-[100%]  ' defaultValue={width ? width : ''} />
                                    <input onInput={inputHandler_height} type="number" className='w-[100%] ' defaultValue={height ? height : ''} />
                                </div>
                            </div>


                            {dimensions(data.options).length === 3 && <div className='flex inputBox' >
                                <div className='w-[50%]'>Объем (м³)</div>
                                <div className='flex-1 flex '>
                                    <input type="number" className='w-full' value={volume} />

                                </div>
                            </div>}


                            <div className='flex inputBox'>
                                <div className='w-[50%]'>
                                    Вес с упаковкой (г)
                                </div>
                                <div className='flex-1 flex '>
                                    <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeWeight(Number(e.target.value)))} defaultValue={weight ? weight : ''} />
                                </div>
                            </div>
                            <div className='flex inputBox'>
                                <div className='w-[50%]'>
                                    Средняя цена
                                </div>
                                <div className='flex-1 flex '>
                                    <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeAveragePrice(Number(e.target.value)))} />
                                </div>
                            </div>
                            <div className='flex inputBox'>
                                <div className='w-[50%]'>
                                    Комиссия (%)
                                </div>
                                <div className='flex-1 flex '>
                                    <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCommission(Number(e.target.value) / 100))} />
                                </div>
                            </div>


                        </div>
                        <div onMouseMove={cardHoverFunction} onMouseLeave={cardLeaveFunction} className='rounded  background_shadow_animation flex-1 flex flex-col gap-[10px] '>
                            <div className='relative  flex-1 flex flex-col p-2 gap-1  transition-all easy-out'>
                                <div onClick={() => saveCurs()} className='absolute top-[0px] right-[0px] flex justify-center align-center text-[rgb(239, 239, 239)]'>
                                    <Icon height="18" icon="ic:save" className='' />
                                </div>
                                <span className='text-[rgb(239, 239, 239)] font-[700]'>Курс</span>
                                <div className='flex inputBox'>
                                    <div className='w-[50%]'>
                                        Доллар
                                    </div>
                                    <div className='flex-1 flex'>
                                        <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_dol(Number(e.target.value)))} defaultValue={curs_dol ? curs_dol : ''} />
                                    </div>
                                </div>
                                <div className='flex inputBox'>
                                    <div className='w-[50%]'>
                                        Юаня
                                    </div>
                                    <div className='flex-1 flex'>
                                        <input type="number" className='w-[100%] ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCurs_uan(Number(e.target.value)))} defaultValue={curs_uan ? curs_uan : ''} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col p-2 rounded shadow-md    transition-all easy-out'>
                                <span className='text-[rgb(239, 239, 239)] font-[700]'>Отсутствующие параметры:</span>
                                {missingСharacteristics(data.options).map((mis: string) => <span key={mis} className='animation_missingCharasteristic font-[500]'>{mis}</span>)}
                            </div>

                        </div>


                    </div>


                    <FirstStep_card_table_WBrent />
                    <FirstStep_card_costCalculation />
                </div>

            </div>

            {/* <div className='absolute w-full top-[100%] left-[0] bg-[blue] p-[5px] text-[1.2rem] text-[rgb(239, 239, 239)] rounded'>
                {data.nm_id}
            </div> */}

        </article>

    );
};

export default FirstStep_card;