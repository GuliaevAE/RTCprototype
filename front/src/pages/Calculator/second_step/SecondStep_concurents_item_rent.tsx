import { useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks'
import { Length, Width, Height, Commission, Cost_price_to, Cost_price_from } from '../../../store/slices/goodsSlice';

const SecondStep_concurents_item_rent = ({ tag, средняяЦена }: { tag: string, средняяЦена: number }) => {


    const from = useAppSelector(Cost_price_from)
    const to = useAppSelector(Cost_price_to)
    const [ценаЗакупа, setЦенаЗакупа] = useState<number>(0)

    useEffect(() => {
        tag === 'from' ? setЦенаЗакупа(from)
            : setЦенаЗакупа(to)
    }, [from, tag, to])
    const Длинна = useAppSelector(Length)
    const Ширина = useAppSelector(Width)
    const Высота = useAppSelector(Height)
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


    const ЛогистикаНа1Заказ_проценты = useMemo(() => ЛогистикаНа1Заказ_абсолют / средняяЦена, [ЛогистикаНа1Заказ_абсолют, средняяЦена])
    const товар = useMemo(() => ценаЗакупа / средняяЦена, [средняяЦена, ценаЗакупа])

    const УпаковкаПлюсМашина = useMemo(() => Упаковка / средняяЦена, [средняяЦена])
    const Отзывы_логистикаПлюсСклад = useMemo(() => (ЛогистикаотОбъема + Упаковка) * 0.21, [ЛогистикаотОбъема])
    const Отзывы_логистикаПлюсСклад_проценты = useMemo(() => Отзывы_логистикаПлюсСклад / средняяЦена, [средняяЦена, Отзывы_логистикаПлюсСклад])
    const Отзывы_комиссияПлюсНалоги = useMemo(() => (комиссия * 0.767 + налоги) * 0.21, [комиссия])
    const Отзывы = useMemo(() => Отзывы_логистикаПлюсСклад_проценты + Отзывы_комиссияПлюсНалоги + Отзывы_фиксы_проценты, [Отзывы_логистикаПлюсСклад_проценты, Отзывы_комиссияПлюсНалоги])

    const Рентабельность_доля = useMemo(() => 1 - (комиссия + ЛогистикаНа1Заказ_проценты + хранение + товар + налоги + брак + УпаковкаПлюсМашина + Отзывы + Фот + Проценты_маркетинг_продвижение), [ЛогистикаНа1Заказ_проценты, Отзывы, УпаковкаПлюсМашина, комиссия, товар])
    const Рентабельность_проценты = useMemo(() => (Рентабельность_доля * 100).toFixed(2), [Рентабельность_доля])
    return (
        <div className='scrollTable flex-1'>
            <div className='text-[0.7rem] tableItem flex-1'>
                <div>{tag === 'from' ? 'Рентабельность от, %.' : 'Рентабельность до, %.'}</div>
                <div>{Number(Рентабельность_проценты) !== -Infinity ? Рентабельность_проценты : 0}</div>
            </div>

        </div>
    );
};

export default SecondStep_concurents_item_rent;