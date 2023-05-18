import React, { useState, useMemo } from 'react';
import { useAppSelector, } from '../../store/hooks'
import { Weight, Commission, AveragePrice, PurchasePrice, Volume, Curs_dol, Curs_uan } from '../../store/slices/goodsSlice';
import { cardHoverFunction, cardLeaveFunction } from '../../animations/cardAnimations';
// import { changeWeight, changeLength, changeWidth, changeHeight } from '../../store/slices/goodsSlice';




const FirstStep_card_costCalculation = () => {

    const Курс_доллар = useAppSelector(Curs_dol)
    const Курс_юань = useAppSelector(Curs_uan)
    const Курс_юань_надбавка = useMemo(()=>Курс_юань+0.25,[Курс_юань]) 
    const Курс_доллар_16 = useMemo(()=>Курс_доллар+Курс_доллар*0.16,[Курс_доллар])

    const стоимостьУпаковки = 40 / 1300 * 74.74



    const комиссия = useAppSelector(Commission)
    const средняяЦена = useAppSelector(AveragePrice)
    const ценаОриентир = useAppSelector(PurchasePrice)
    const вес = useAppSelector(Weight) / 1000
    const объем = useAppSelector(Volume)

    const расчетВеса_добор15 = useMemo(() => вес + вес * 0.15, [вес])
    const [ставка_кг_м3, setставка] = useState(0)
    const вРублях = useMemo(() => ставка_кг_м3 * Курс_доллар_16, [Курс_доллар_16, ставка_кг_м3])
    const ставка_едТовара = useMemo(() => вРублях * расчетВеса_добор15, [вРублях, расчетВеса_добор15])

    const цена_юани_от = useMemo(() => (ценаОриентир - (ставка_едТовара + стоимостьУпаковки)) / Курс_юань_надбавка / 1.01, [Курс_юань_надбавка, ставка_едТовара, стоимостьУпаковки, ценаОриентир])
    const [цена_юани_до, setцена_юани_до] = useState(0)
    const себестоимость_от = useMemo(() => цена_юани_от * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_от])
    //////////////////////////
    const себестоимость_до = useMemo(() => цена_юани_до * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_до])
    //////////////////////////


    const плотность = useMemo(() => расчетВеса_добор15 / объем, [объем, расчетВеса_добор15])

    const страховка_доставка_от = useMemo(() => себестоимость_от * 0.01, [себестоимость_от])
    const страховка_доставка_до = useMemo(() => себестоимость_до * 0.01, [себестоимость_до])
    const доставка_ед_от = useMemo(() => ставка_едТовара + страховка_доставка_от + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_от])
    const доставка_ед_до = useMemo(() => ставка_едТовара + страховка_доставка_до + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_до])
    const стоимость_от = useMemo(() => себестоимость_от + доставка_ед_от, [доставка_ед_от, себестоимость_от])
    const стоимость_до = useMemo(() => себестоимость_до + доставка_ед_до, [доставка_ед_до, себестоимость_до])








    const tableScroll = (e: any) => {
        if (e.currentTarget) {
            const target = e.currentTarget as HTMLElement
            target.scrollLeft += e.deltaY

        }

    }




    return (
        <>
            <div onMouseMove={cardHoverFunction} onMouseLeave={cardLeaveFunction} className='background_shadow_animation scrollTable  flex flex-col p-2    '>
                <h2>Расчет себестоимости </h2>
                <div onWheel={tableScroll} className='scrollTable overflow-x-scroll'>
                    <table  className=''>
                        <tr>
                            <td className='text-[0.7rem]'>Комиссия</td>
                            <td className='text-[0.7rem]'>Средняя цена</td>
                            <td className='text-[0.7rem]'>Цена ориентир</td>
                            <td className='text-[0.7rem]'>Цена (ю) от</td>
                            <td className='text-[0.7rem]'>Цена (ю) до</td>
                            <td className='text-[0.7rem]'>Себестоимость (руб.)  от</td>
                            <td className='text-[0.7rem]'>Себестоимость (руб.) до</td>
                            <td className='text-[0.7rem]'>Вес в кг</td>
                            <td className='text-[0.7rem]'>Расчет веса с добором в 15%</td>
                            <td className='text-[0.7rem]'>Расчет объема, м^3</td>
                            <td className='text-[0.7rem]'>Расчет плотности</td>
                            <td className='text-[0.7rem]'>Ставка за кг/м3</td>
                            <td className='text-[0.7rem]'> В рублях</td>
                            <td className='text-[0.7rem]'>Ставка за ед товара</td>
                            <td className='text-[0.7rem]'>Страховка на доставку (руб) от</td>
                            <td className='text-[0.7rem]'>Страховка на доставку (руб) до</td>
                            <td className='text-[0.7rem]'>Стоимость упаковки</td>
                            <td className='text-[0.7rem]'>Доставка на 1 шт. от</td>
                            <td className='text-[0.7rem]'>Доставка на 1 шт. до</td>
                            <td className='text-[0.7rem]'>Стоимость от (руб.)</td>
                            <td className='text-[0.7rem]'>Стоимость до (руб.)</td>
                            <td className='text-[0.7rem]'>Курс доллара по ЦБ</td>
                            <td className='text-[0.7rem]'>Курс Юаня+16%</td>
                            <td className='text-[0.7rem]'>Курс Юаня по сайту с надбавкой 0,25</td>
                            <td className='text-[0.7rem]'>Курс доллара + 16%</td>
                        </tr>
                        <tr>
                            <td>
                                <input disabled value={комиссия} type="number" />
                            </td>
                            <td>
                                <input disabled value={средняяЦена} type="number" />
                            </td>
                            <td>
                                <input disabled value={ценаОриентир} type="number" />
                            </td>
                            <td>
                                <input disabled value={цена_юани_от} type="number" />
                            </td>
                            <td>
                                <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => setцена_юани_до(Number(e.target.value))} defaultValue={цена_юани_до} type="number" />
                            </td>
                            <td>
                                <input disabled value={себестоимость_от} type="number" />
                            </td>
                            <td>
                                <input disabled value={себестоимость_до} type="number" />
                            </td>
                            <td>
                                <input disabled value={вес} type="number" />
                            </td>
                            <td>
                                <input disabled value={расчетВеса_добор15} type="number" />
                            </td>
                            <td>
                                <input disabled value={объем} type="number" />
                            </td>
                            <td>
                                <input disabled value={плотность} type="number" />
                            </td>
                            <td>
                                <input onInput={(e: React.ChangeEvent<HTMLInputElement>) => setставка(Number(e.target.value))} defaultValue={ставка_кг_м3} type="number" />
                            </td>
                            <td>
                                <input disabled value={вРублях} type="number" />
                            </td>
                            <td>
                                <input disabled value={ставка_едТовара} type="number" />
                            </td>
                            <td>
                                <input disabled value={страховка_доставка_от} type="number" />
                            </td>
                            <td>
                                <input disabled value={страховка_доставка_до} type="number" />
                            </td>
                            <td>
                                <input disabled value={стоимостьУпаковки} type="number" />
                            </td>
                            <td>
                                <input disabled value={доставка_ед_от} type="number" />
                            </td>
                            <td>
                                <input disabled value={доставка_ед_до} type="number" />
                            </td>
                            <td>
                                <input disabled value={стоимость_от} type="number" />
                            </td>
                            <td>
                                <input disabled value={стоимость_до} type="number" />
                            </td>
                            <td>
                                <input disabled value={Курс_доллар} type="number" />
                            </td>
                            <td>
                                <input disabled value={Курс_юань} type="number" />
                            </td>
                            <td>
                                <input disabled value={Курс_юань_надбавка} type="number" />
                            </td>
                            <td>
                                <input disabled value={Курс_доллар_16} type="number" />
                            </td>

                        </tr>

                    </table>
                </div>


            </div>

        </>

    );
};

export default FirstStep_card_costCalculation;