import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector, } from '../../../store/hooks'
import { Weight, Commission, AveragePrice, PurchasePrice, Volume, Curs_dol, Curs_uan, changeDensity, Rate_per_kg, OriginalStaf } from '../../../store/slices/goodsSlice';
import Card from '../Card';
import Icon_cross from '../../../components/Icon_vision';
import Icon_addORupdate from '../../../components/Icon_addORupdate';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Length, Width, Height, changePurchasePrice } from '../../../store/slices/goodsSlice';


const FirstStep_card_costCalculation = () => {

    //расчет себестоимости
    const [switcher, setSwitch1] = useState<boolean>(false)
    const originalStaf = useAppSelector(OriginalStaf)
    const dispatch = useAppDispatch()

    const { itemId } = useParams()
    const [status, setStatus] = useState<boolean>(false)

    const Курс_доллар = useAppSelector(Curs_dol)
    const Курс_юань = useAppSelector(Curs_uan)
    const Курс_юань_надбавка = useMemo(() => Курс_юань + 0.25, [Курс_юань])
    const Курс_доллар_16 = useMemo(() => Курс_доллар + Курс_доллар * 0.16, [Курс_доллар])

    const стоимостьУпаковки = 40 / 1300 * 74.74



    const комиссия = useAppSelector(Commission)
    const средняяЦена = useAppSelector(AveragePrice)
    const ценаОриентир = useAppSelector(PurchasePrice)
    const вес = useAppSelector(Weight) / 1000
    const объем = useAppSelector(Volume)

    const расчетВеса_добор15 = useMemo(() => вес + вес * 0.15, [вес])
    const ставка_кг_м3 = useAppSelector(Rate_per_kg)

    const плотность = useMemo(() => расчетВеса_добор15 / объем, [объем, расчетВеса_добор15])
    useEffect(() => {
        dispatch(changeDensity(плотность))
    }, [dispatch, плотность])

    const вРублях = useMemo(() => ставка_кг_м3 * Курс_доллар_16, [Курс_доллар_16, ставка_кг_м3])
    const ставка_едТовара = useMemo(() => {
        return плотность < 100 ? вРублях * объем :
            вРублях * расчетВеса_добор15
    }, [вРублях, объем, плотность, расчетВеса_добор15])

    const цена_юани_от = useMemo(() => (ценаОриентир - (ставка_едТовара + стоимостьУпаковки)) / Курс_юань_надбавка / 1.01, [Курс_юань_надбавка, ставка_едТовара, стоимостьУпаковки, ценаОриентир])
    // const [цена_юани_до, setцена_юани_до] = useState(0)
    const себестоимость_от = useMemo(() => цена_юани_от * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_от])
    //////////////////////////
    // const себестоимость_до = useMemo(() => цена_юани_до * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_до])
    //////////////////////////




    const страховка_доставка_от = useMemo(() => себестоимость_от * 0.01, [себестоимость_от])
    // const страховка_доставка_до = useMemo(() => себестоимость_до * 0.01, [себестоимость_до])
    const доставка_ед_от = useMemo(() => ставка_едТовара + страховка_доставка_от + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_от])
    // const доставка_ед_до = useMemo(() => ставка_едТовара + страховка_доставка_до + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_до])
    const стоимость_от = useMemo(() => себестоимость_от + доставка_ед_от, [доставка_ед_от, себестоимость_от])
    // const стоимость_до = useMemo(() => себестоимость_до + доставка_ед_до, [доставка_ед_до, себестоимость_до])

    useEffect(() => {
        setStatus(false)
    }, [originalStaf, Курс_доллар, Курс_юань, Курс_юань_надбавка, Курс_доллар_16, комиссия, средняяЦена, ценаОриентир, вес, объем, расчетВеса_добор15, ставка_кг_м3])



    //рента WB

    const [switcherForOptionalParameters, setSwitch2] = useState<boolean>(false)


    ///табличные параметры 
    const Длинна = useAppSelector(Length)
    const Ширина = useAppSelector(Width)
    const Высота = useAppSelector(Height)

    // const объем = useMemo(() => Длинна * Ширина * Высота / 1000, [Высота, Длинна, Ширина])
    const СреднийТарифЛогистики = 73.375
    const хранение = 0.0200000000000006
    const налоги = 0.0400000000000012
    const брак = 0.0100000000000006
    const Упаковка = 30
    const Отзывы_фиксы_проценты = 0.0149999999999986
    const Фот = 0.100000000000013
    const Проценты_маркетинг_продвижение = 0.0100000000000001

    const ЛогистикаотОбъема = useMemo(() => объем <= 5 ? СреднийТарифЛогистики : СреднийТарифЛогистики + (объем - 5) * СреднийТарифЛогистики / 10, [объем])
    const ЛогистикаНа1Заказ_абсолют = ((ЛогистикаотОбъема * 1.15) + 0.13 * 33) / 0.87
    const ценаЗакупа = useMemo(() => средняяЦена - 0.35 * средняяЦена - Упаковка - ((налоги + комиссия) * средняяЦена) - ЛогистикаНа1Заказ_абсолют, [ЛогистикаНа1Заказ_абсолют, комиссия, средняяЦена])

    const ЛогистикаНа1Заказ_проценты = useMemo(() => ЛогистикаНа1Заказ_абсолют / средняяЦена, [ЛогистикаНа1Заказ_абсолют, средняяЦена])
    const товар = useMemo(() => ценаЗакупа / средняяЦена, [средняяЦена, ценаЗакупа])

    const УпаковкаПлюсМашина = useMemo(() => Упаковка / средняяЦена, [средняяЦена])
    const Отзывы_логистикаПлюсСклад = useMemo(() => (ЛогистикаотОбъема + Упаковка) * 0.21, [ЛогистикаотОбъема])
    const Отзывы_логистикаПлюсСклад_проценты = useMemo(() => Отзывы_логистикаПлюсСклад / средняяЦена, [средняяЦена, Отзывы_логистикаПлюсСклад])
    const Отзывы_комиссияПлюсНалоги = useMemo(() => (комиссия * 0.767 + налоги) * 0.21, [комиссия])
    const Отзывы = useMemo(() => Отзывы_логистикаПлюсСклад_проценты + Отзывы_комиссияПлюсНалоги + Отзывы_фиксы_проценты, [Отзывы_логистикаПлюсСклад_проценты, Отзывы_комиссияПлюсНалоги])

    const Рентабельность_доля = useMemo(() => 1 - (комиссия + ЛогистикаНа1Заказ_проценты + хранение + товар + налоги + брак + УпаковкаПлюсМашина + Отзывы + Фот + Проценты_маркетинг_продвижение), [ЛогистикаНа1Заказ_проценты, Отзывы, УпаковкаПлюсМашина, комиссия, товар])
    const Рентабельность_проценты = useMemo(() => (Рентабельность_доля * 100).toFixed(2), [Рентабельность_доля])

    //рабочее
    const ВаловаяПрибыль = useMemo(() => 1 - комиссия - ЛогистикаНа1Заказ_проценты - товар - налоги - УпаковкаПлюсМашина, [ЛогистикаНа1Заказ_проценты, УпаковкаПлюсМашина, комиссия, товар])

    const Расход_маркетинг_продвижение = useMemo(() => средняяЦена * Проценты_маркетинг_продвижение, [средняяЦена])
    const Рентабельность_от_продажи = useMemo(() => Рентабельность_доля * средняяЦена, [средняяЦена, Рентабельность_доля])
    const МаржинальнаяПрибыль = useMemo(() => ВаловаяПрибыль - хранение - Отзывы - Проценты_маркетинг_продвижение, [ВаловаяПрибыль, Отзывы])





    useEffect(() => {
        ценаЗакупа && dispatch(changePurchasePrice(ценаЗакупа))
    }, [dispatch, ценаЗакупа])



    const addORupdateFunction = () => {
        if (status) return
        const costArray = [
            originalStaf.nm_id, originalStaf.imt_name, "", "",
            комиссия, средняяЦена, ценаОриентир, Number(вес) ? Number(цена_юани_от) > 0 ? null : 'не подходит' : '*вес', "", null, null, вес, null, объем, null, ставка_кг_м3, вРублях, ставка_едТовара, null, null, стоимостьУпаковки, null, null, null, null, Курс_доллар, Курс_юань, null, null
        ]
        const rentArray = [
            originalStaf.imt_name, '', originalStaf.nm_id, средняяЦена, ценаЗакупа, комиссия, Длинна, Ширина, Высота, объем, СреднийТарифЛогистики, ЛогистикаотОбъема, ЛогистикаНа1Заказ_абсолют, ЛогистикаНа1Заказ_проценты, хранение, товар, налоги, брак, Упаковка, УпаковкаПлюсМашина, '', '', '', '', '', Фот, Проценты_маркетинг_продвижение, Расход_маркетинг_продвижение, Рентабельность_доля, Рентабельность_от_продажи, Рентабельность_проценты, ВаловаяПрибыль, МаржинальнаяПрибыль
        ]
        if (itemId) {

            axios.post('https://natalyshando.ru/change_catalog_item', {
                data: costArray,
                key: itemId.split('-')[1]
            }).then(
                () => axios.post('https://natalyshando.ru/change_rentaWB_item', {
                    data: rentArray,
                    key: itemId.split('-')[1]
                }).then(res => res.data.status && setStatus(true)).catch(res => console.log(res))
            ).catch(res => console.log(res))
        }
        else {
            axios.post('https://natalyshando.ru/add_catalog_item', {
                data: costArray,
            }).then(() =>
                axios.post('https://natalyshando.ru/add_rentaWB_item', { data: rentArray }).then(res => res.data.status && setStatus(true)).catch(res => console.log(res))
            ).catch(res => console.log(res))
        }


    }



    return (
        <>
            <Card additionalClass='flex-auto'>
                <Icon_cross clickFunction={() => setSwitch1(!switcher)} />
                <Icon_addORupdate clickFunction={addORupdateFunction} status={status} />
                <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Расчет себестоимости</span>
                <div className='scrollTable overflow-x-auto flex gap-2 flex-wrap'>
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Комиссия</div>
                        <div>{комиссия}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Средняя цена</div>
                        <div>{средняяЦена}</div>
                    </div>}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Цена ориентир</div>
                        <div>{ценаОриентир}</div>
                    </div>
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Цена (ю) от</div>
                        <div>{цена_юани_от}</div>
                    </div>
                    {/* <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Цена (ю) до</div>
                    <div>{цена_юани_до}</div>
                </div> */}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Себестоимость (руб.)  от</div>
                        <div>{себестоимость_от}</div>
                    </div>
                    {/* {switcher&&<div className='text-[0.7rem] tableItem flex-1'>
                    <div>Себестоимость (руб.) до</div>
                    <div>{себестоимость_до}</div>
                </div>} */}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Вес в кг</div>
                        <div>{вес}</div>
                    </div>
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Расчет веса с добором в 15%</div>
                        <div>{расчетВеса_добор15}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Расчет объема, м^3</div>
                        <div>{объем}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Расчет плотности</div>
                        <div>{плотность}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Ставка за кг/м3</div>
                        <div>{ставка_кг_м3}</div>
                    </div>}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>В рублях</div>
                        <div>{вРублях}</div>
                    </div>
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Ставка за ед товара</div>
                        <div>{ставка_едТовара}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Страховка на доставку (руб) от</div>
                        <div>{страховка_доставка_от}</div>
                    </div>}
                    {/* <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Страховка на доставку (руб) до</div>
                    <div>{страховка_доставка_до}</div>
                </div> */}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Стоимость упаковки</div>
                        <div>{стоимостьУпаковки}</div>
                    </div>}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Доставка на 1 шт. от</div>
                        <div>{доставка_ед_от}</div>
                    </div>
                    {/* <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Доставка на 1 шт. до</div>
                    <div>{доставка_ед_до}</div>
                </div> */}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div className='animation_missingCharasteristic'>Стоимость от (руб.)</div>
                        <div>{стоимость_от}</div>
                    </div>
                    {/* <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Стоимость до (руб.)</div>
                    <div>{стоимость_до}</div>
                </div> */}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Курс доллара по ЦБ</div>
                        <div>{Курс_доллар}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Курс Юаня+16%</div>
                        <div>{Курс_юань}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Курс Юаня по сайту с надбавкой 0,25</div>
                        <div>{Курс_юань_надбавка}</div>
                    </div>}
                    {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Курс доллара + 16%</div>
                        <div>{Курс_доллар_16}</div>
                    </div>}

                </div>
            </Card>
            <Card additionalClass=''>
                <Icon_cross clickFunction={() => setSwitch2(!switcherForOptionalParameters)} />
                <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'> Калькулятор рента WB</span>
                <div className='scrollTable overflow-x-auto flex gap-2 flex-wrap'>
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Средняя цена</div>
                        <div>{средняяЦена}</div>
                    </div>
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Цена закупа</div>
                        <div>{ценаЗакупа}</div>
                    </div>
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Объем, л</div>
                        <div>{объем}</div>
                    </div>
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Средний тариф логистики по складам</div>
                        <div>{СреднийТарифЛогистики}</div>
                    </div>}
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Логистика от объёма</div>
                        <div>{ЛогистикаотОбъема}</div>
                    </div>}
                    {switcherForOptionalParameters && <div className='text-[0.7rem] tableItem flex-1'>
                        <div>Рентабельность_доля</div>
                        <div>{Рентабельность_доля ? Рентабельность_доля : 0}</div>
                    </div>}
                    <div className='text-[0.7rem] tableItem flex-1'>
                        <div className='animation_missingCharasteristic'>Рентабельность, %.</div>
                        <div>{Number(Рентабельность_проценты) ? Рентабельность_проценты : 0}</div>
                    </div>
                </div>
            </Card>
        </>


    );
};

export default FirstStep_card_costCalculation;