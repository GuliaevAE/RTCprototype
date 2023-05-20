import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { OriginalStaf, Weight, Length, Width, Height, Volume, changeVolume, changePurchasePrice, changeRate_per_kg, Density } from '../../../store/slices/goodsSlice';
import { changeWeight, changeLength, changeWidth, changeHeight, changeCommission, changeAveragePrice } from '../../../store/slices/goodsSlice';


interface IDataOption_item {
    name: string,
    value: string
}
const FirstStep_calculator_mainCharasteristic = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(OriginalStaf)

    const weight = useAppSelector(Weight)
    const length = useAppSelector(Length)
    const width = useAppSelector(Width)
    const height = useAppSelector(Height) 
    const volume = useAppSelector(Volume)

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

    const [ставка_кг_м3, setставка] = useState(0)

    const inputHeandler_ставка = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeRate_per_kg(Number(e.target.value)))
        setставка(Number(e.target.value))
    }


    const density = useAppSelector(Density)

    return (
        <>
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
                    <input type="number" className='w-[100%]' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeWeight(Number(e.target.value)))} defaultValue={weight ? weight : ''} />
                </div>
            </div>
            <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Средняя цена
                </div>
                <div className='flex-1 flex '>
                    <input type="number" className='w-[100%]' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeAveragePrice(Number(e.target.value)))} />
                </div>
            </div>
            <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Комиссия (%)
                </div>
                <div className='flex-1 flex '>
                    <input type="number" className='w-[100%]' onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCommission(Number(e.target.value) / 100))} />
                </div>
            </div>

            <div className='flex inputBox'>
                <div className='w-[50%]'>
                    Плотность и ставка
                </div>
                <div className='flex-1 flex gap-1'>
                    <input disabled className='w-[100%]' value={density} type="number" />
                    <input onInput={inputHeandler_ставка} className='w-[100%]  ' defaultValue={ставка_кг_м3} type="number" />
                </div>
            </div>
        </>
    );
};

export default FirstStep_calculator_mainCharasteristic;