import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector, } from '../../../store/hooks'
import { Weight, Commission, AveragePrice, PurchasePrice, Volume, Curs_dol, Curs_uan, Rate_per_kg, Price_uan_from, Price_uan_to, changeCost_price_from, changeCost_price_to, Density } from '../../../store/slices/goodsSlice';
import Card from '../Card';
import Icon_cross from '../../../components/Icon_vision';

const SecondStep_card_costCalculation = () => {
    const [switcher, setSwitch] = useState<boolean>(false)

    const dispatch = useAppDispatch()

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
    const вРублях = useMemo(() => ставка_кг_м3 * Курс_доллар_16, [Курс_доллар_16, ставка_кг_м3])
    // const плотность = useMemo(() => расчетВеса_добор15 / объем, [объем, расчетВеса_добор15])
    const плотность = useAppSelector(Density)


    const ставка_едТовара = useMemo(() => {
        return плотность < 100 ? вРублях * объем :
            вРублях * расчетВеса_добор15
    }, [вРублях, объем, плотность, расчетВеса_добор15])
    const цена_юани_от = useAppSelector(Price_uan_from)

    const цена_юани_до = useAppSelector(Price_uan_to)


    const себестоимость_от = useMemo(() => цена_юани_от * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_от])
    //////////////////////////
    const себестоимость_до = useMemo(() => цена_юани_до * Курс_юань_надбавка, [Курс_юань_надбавка, цена_юани_до])
    //////////////////////////





    const страховка_доставка_от = useMemo(() => себестоимость_от * 0.01, [себестоимость_от])
    const страховка_доставка_до = useMemo(() => себестоимость_до * 0.01, [себестоимость_до])
    const доставка_ед_от = useMemo(() => ставка_едТовара + страховка_доставка_от + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_от])
    const доставка_ед_до = useMemo(() => ставка_едТовара + страховка_доставка_до + стоимостьУпаковки, [ставка_едТовара, стоимостьУпаковки, страховка_доставка_до])
    const стоимость_от = useMemo(() => себестоимость_от + доставка_ед_от, [доставка_ед_от, себестоимость_от])
    const стоимость_до = useMemo(() => себестоимость_до + доставка_ед_до, [доставка_ед_до, себестоимость_до])



    useEffect(() => {
        dispatch(changeCost_price_from(стоимость_от))
    }, [dispatch, стоимость_от])
    useEffect(() => {
        dispatch(changeCost_price_to(стоимость_до))
    }, [dispatch, стоимость_до])

    const tableScroll = () => {
        // if (e.currentTarget) {
        //     const target = e.currentTarget as HTMLElement
        //     target.scrollLeft += e.deltaY
        // }

    }

    return (
        <Card additionalClass='flex-auto'>
          <Icon_cross clickFunction={() => setSwitch(!switcher)}/>
            <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Расчет себестоимости </span>
            <div onWheel={tableScroll} className='scrollTable overflow-x-auto flex gap-2 flex-wrap'>
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Комиссия</div>
                    <div>{комиссия}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Средняя цена</div>
                    <div>{средняяЦена}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Цена ориентир</div>
                    <div>{ценаОриентир}</div>
                </div>}
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Цена (ю) от</div>
                    <div>{цена_юани_от}</div>
                </div>
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Цена (ю) до</div>
                    <div>{цена_юани_до}</div>
                </div>
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Себестоимость (руб.)  от</div>
                    <div>{себестоимость_от}</div>
                </div>
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Себестоимость (руб.) до</div>
                    <div>{себестоимость_до}</div>
                </div>
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Вес в кг</div>
                    <div>{вес}</div>
                </div>}
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
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Ставка за кг/м3</div>
                    <div>{ставка_кг_м3}</div>
                </div>
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>В рублях</div>
                    <div>{вРублях}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Ставка за ед товара</div>
                    <div>{ставка_едТовара}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Страховка на доставку (руб) от</div>
                    <div>{страховка_доставка_от}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Страховка на доставку (руб) до</div>
                    <div>{страховка_доставка_до}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Стоимость упаковки</div>
                    <div>{стоимостьУпаковки}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Доставка на 1 шт. от</div>
                    <div>{доставка_ед_от}</div>
                </div>}
                {switcher && <div className='text-[0.7rem] tableItem flex-1'>
                    <div>Доставка на 1 шт. до</div>
                    <div>{доставка_ед_до}</div>
                </div>}
                <div className='text-[0.7rem] tableItem flex-1'>
                    <div className='animation_missingCharasteristic'>Стоимость от (руб.)</div>
                    <div>{стоимость_от}</div>
                </div>
                <div className='text-[0.7rem] tableItem flex-1 '>
                    <div className='animation_missingCharasteristic'>Стоимость до (руб.)</div>
                    <div>{стоимость_до}</div>
                </div>
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

    );
};

export default SecondStep_card_costCalculation;