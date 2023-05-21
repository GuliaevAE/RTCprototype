import { useState, useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks'
import { Length, Width, Height, Commission, AveragePrice, Cost_price_from } from '../../../store/slices/goodsSlice';
import Card from '../Card';
import Icon_cross from '../../../components/Icon_cross';



const SecondStep_card_table_WBrent = () => {
    const [switcherForOptionalParameters, setSwitch] = useState<boolean>(false)

    ///табличные параметры 
    const Длинна = useAppSelector(Length)
    const Ширина = useAppSelector(Width)
    const Высота = useAppSelector(Height)

    const средняяЦена = useAppSelector(AveragePrice)
    const комиссия = useAppSelector(Commission)
    const объем = useMemo(() => Длинна * Ширина * Высота / 1000, [Высота, Длинна, Ширина])
    const СреднийТарифЛогистики = 73.375
    const хранение = 0.0200000000000006
    const налоги = 0.0400000000000012
    const брак = 0.0100000000000006
    const Упаковка = 30
    const Отзывы_фиксы_проценты = 0.0149999999999986
    const Фот = 0.100000000000013
    const Проценты_маркетинг_продвижение = 0.0100000000000001

    const ЛогистикаотОбъема = объем <= 5 ? СреднийТарифЛогистики : СреднийТарифЛогистики + (объем - 5) * СреднийТарифЛогистики / 10
    const ЛогистикаНа1Заказ_абсолют = ((ЛогистикаотОбъема * 1.15) + 0.13 * 33) / 0.87

    const ценаЗакупа = useAppSelector(Cost_price_from)


    const ЛогистикаНа1Заказ_проценты = useMemo(() => ЛогистикаНа1Заказ_абсолют / средняяЦена, [ЛогистикаНа1Заказ_абсолют, средняяЦена])
    const товар = useMemo(() => ценаЗакупа / средняяЦена, [средняяЦена, ценаЗакупа])

    const УпаковкаПлюсМашина = useMemo(() => Упаковка / средняяЦена, [средняяЦена])
    const Отзывы_логистикаПлюсСклад = useMemo(() => (ЛогистикаотОбъема + Упаковка) * 0.21, [ЛогистикаотОбъема])
    const Отзывы_логистикаПлюсСклад_проценты = useMemo(() => Отзывы_логистикаПлюсСклад / средняяЦена, [средняяЦена, Отзывы_логистикаПлюсСклад])
    const Отзывы_комиссияПлюсНалоги = useMemo(() => (комиссия * 0.767 + налоги) * 0.21, [комиссия])
    const Отзывы = useMemo(() => Отзывы_логистикаПлюсСклад_проценты + Отзывы_комиссияПлюсНалоги + Отзывы_фиксы_проценты, [Отзывы_логистикаПлюсСклад_проценты, Отзывы_комиссияПлюсНалоги])

    const Рентабельность_доля = useMemo(() => 1 - (комиссия + ЛогистикаНа1Заказ_проценты + хранение + товар + налоги + брак + УпаковкаПлюсМашина + Отзывы + Фот + Проценты_маркетинг_продвижение), [ЛогистикаНа1Заказ_проценты, Отзывы, УпаковкаПлюсМашина, комиссия, товар])
    const Рентабельность_проценты = useMemo(() => (Рентабельность_доля * 100).toFixed(2), [Рентабельность_доля])
    // const Расход_маркетинг_продвижение = useMemo(() => средняяЦена * Проценты_маркетинг_продвижение, [средняяЦена])
    // const Рентабельность_от_продажи = useMemo(() => Рентабельность_доля * средняяЦена, [средняяЦена, Рентабельность_доля])
    // const МаржинальнаяПрибыль = useMemo(() => ВаловаяПрибыль - хранение - Отзывы - Проценты_маркетинг_продвижение, [ВаловаяПрибыль, Отзывы])
    // const ВаловаяПрибыль = useMemo(() => 1 - комиссия - ЛогистикаНа1Заказ_проценты - товар - налоги - УпаковкаПлюсМашина, [ЛогистикаНа1Заказ_проценты, УпаковкаПлюсМашина, комиссия, товар])


    const tableScroll = () => {
        // if (e.currentTarget) {
        //     const target = e.currentTarget as HTMLElement
        //     target.scrollLeft += e.deltaY
        // }

    }


    return (
        <>
            <Card additionalClass='FirstStep_card_table_WBrent_item '>
              <Icon_cross clickFunction={() => setSwitch(!switcherForOptionalParameters)}/>

                <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Калькулятор рента WB (цена от)</span>
                <div onWheel={tableScroll} className='scrollTable overflow-x-auto flex gap-2 flex-wrap'>
                    <div className='text-[0.7rem] tableItem'>
                        <div>Средняя цена</div>
                        <div>{средняяЦена}</div>
                    </div>
                    <div className='text-[0.7rem] tableItem'>
                        <div>Цена закупа</div>
                        <div>{ценаЗакупа}</div>
                    </div>
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem'>
                        <div>Объем, л</div>
                        <div>{объем}</div>
                    </div>}
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem'>
                        <div>Средний тариф логистики по складам</div>
                        <div>{СреднийТарифЛогистики}</div>
                    </div>}
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem'>
                        <div>Логистика от объёма</div>
                        <div>{ЛогистикаотОбъема}</div>
                    </div>}
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem'>
                        <div>Рентабельность_доля</div>
                        <div>{Рентабельность_доля!==-Infinity?Рентабельность_доля:0}</div>
                    </div>}
                    <div className='text-[0.7rem] tableItem'>
                        <div className='animation_missingCharasteristic'>Рентабельность, %.</div>
                        <div>{Number(Рентабельность_проценты)!==-Infinity?Рентабельность_проценты:0}</div>
                    </div>





                    {/* <table  >
                        <tr>
                            <td className='text-[0.7rem] '>Средняя цена</td>
                            <td className='text-[0.7rem] '>Цена закупа</td>
                            <td className='text-[0.7rem] '>Комиссия</td>
                            <td className='text-[0.7rem] '>Д, см</td>
                            <td className='text-[0.7rem] '>Ш, см</td>
                            <td className='text-[0.7rem] '>В, см</td>
                            <td className='text-[0.7rem] '>Объем, л</td>
                            <td className='text-[0.7rem] '>Средний тариф логистики по складам</td>
                            <td className='text-[0.7rem] '>Логистика от объёма</td>
                            <td className='text-[0.7rem] '>Рентабельность_доля</td>
                            <td className='text-[0.7rem] '>Рентабельность от цены продажи, руб.</td>
                            <td className='text-[0.7rem] '>Рентабельность, %.</td>
                            <td className='text-[0.7rem] '>Валовая прибыль, %.</td>
                            <td className='text-[0.7rem] '>Маржинальная прибыль</td>
                        </tr>
                        <tr>
                            <td>
                                <input disabled value={средняяЦена} type="number" />
                            </td>
                            <td>
                                <input disabled value={ценаЗакупа} type="number" />
                            </td>
                            <td>
                                <input disabled value={комиссия} type="number" />
                            </td>
                            <td>
                                <input disabled value={Длинна} type="number" />
                            </td>
                            <td>
                                <input disabled value={Ширина} type="number" />
                            </td>
                            <td>
                                <input disabled value={Высота} type="number" />
                            </td>
                            <td>
                                <input disabled value={объем} type="number" />
                            </td>
                            <td>
                                <input disabled value={СреднийТарифЛогистики} type="number" />
                            </td>
                            <td>
                                <input disabled value={ЛогистикаотОбъема} type="number" />
                            </td>
                            <td>
                                <input disabled value={Рентабельность_доля} type="number" />
                            </td>
                            <td>
                                <input disabled value={Рентабельность_от_продажи} type="number" />
                            </td>
                            <td>
                                <input disabled value={Рентабельность_проценты} type="number" />
                            </td>
                            <td>
                                <input disabled value={ВаловаяПрибыль} type="number" />
                            </td>
                            <td>
                                <input disabled value={МаржинальнаяПрибыль} type="number" />
                            </td>
                        </tr>



                    </table> */}
                </div>
            </Card>
            {/* {switcherForOptionalParameters && <Card additionalClass='FirstStep_card_table_WBrent_item'>
                <h2>Скрытые вычисления</h2>
                <div onWheel={tableScroll} className='scrollTable overflow-x-auto'>
                    <table>
                        <tr>
                            <td>Логистика на 1 заказ в абсолютном значении</td>
                            <td>Логистика на 1 заказ в %</td>
                            <td>Хранение</td>
                            <td>Товар</td>
                            <td>Налоги</td>
                            <td>брак</td>
                            <td>Упаковка (все, что на складе происходит + машина до вб), знач.</td>
                            <td>Упаковка (все, что на складе происходит + машина до вб), %</td>
                            <td>Отзывы логистика + склад, знач.</td>
                            <td>Отзывы логистика + склад, %</td>
                            <td>Отзывы комиссия + налоги</td>
                            <td>Отзывы фиксы в %</td>
                            <td>Отзывы</td>
                            <td>Фот</td>
                            <td>% на маркетинговое продвижение</td>
                            <td>Расход на маркетинговое продвижение</td>
                        </tr>
                        <tr>
                            <td>
                                <input disabled value={ЛогистикаНа1Заказ_абсолют} type="number" />
                            </td>
                            <td>
                                <input disabled value={ЛогистикаНа1Заказ_проценты} type="number" />
                            </td>
                            <td>
                                <input disabled value={хранение} type="number" />
                            </td>
                            <td>
                                <input disabled value={товар} type="number" />
                            </td>
                            <td>
                                <input disabled value={налоги} type="number" />
                            </td>
                            <td>
                                <input disabled value={брак} type="number" />
                            </td>
                            <td>
                                <input disabled value={Упаковка} type="number" />
                            </td>
                            <td>
                                <input disabled value={УпаковкаПлюсМашина} type="number" />
                            </td>
                            <td>
                                <input disabled value={Отзывы_логистикаПлюсСклад} type="number" />
                            </td>
                            <td>
                                <input disabled value={Отзывы_логистикаПлюсСклад_проценты} type="number" />
                            </td>
                            <td>
                                <input disabled value={Отзывы_комиссияПлюсНалоги} type="number" />
                            </td>
                            <td>
                                <input disabled value={Отзывы_фиксы_проценты} type="number" />
                            </td>
                            <td>
                                <input disabled value={Отзывы} type="number" />
                            </td>
                            <td>
                                <input disabled value={Фот} type="number" />
                            </td>
                            <td>
                                <input disabled value={Проценты_маркетинг_продвижение} type="number" />
                            </td>
                            <td>
                                <input disabled value={Расход_маркетинг_продвижение} type="number" />
                            </td>
                        </tr>

                    </table>

                </div>
            </Card>} */}


        </>

    );
};

export default SecondStep_card_table_WBrent;