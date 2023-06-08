import  { useState } from 'react';
import Card from '../Calculator/Card';
import Icon_cross from '../../components/Icon_vision';
import { Link } from 'react-router-dom';
import Icon_calc from '../../components/Icon_calc';

const Catalog_item = ({ catalogItem, k }: { catalogItem: string[], k: number }) => {
    const [switcher, setswitch] = useState<boolean>(false)
    const names = [
        "Индекс",
        "Наименование",
        "",
        "Логистика",
        "Комиссия",
        "Средняя цена",
        "Цена ориентир",
        "Цена(ю) от",
        "Цена(ю) до",
        "Себестоимость(руб.) от",
        "Себестоимость(руб.) до",
        "Вес в кг",
        "Расчет веса с добором в 15 %",
        "Расчет объема, м ^ 3",
        "Расчет плотности",
        "Ставка за кг / м3	В рублях",
        "В рублях",
        "Ставка за ед товара",
        "Страховка на доставку(руб) от",
        "Страховка на доставку(руб) до",
        "Стоимость упаковки",
        "Доставка на 1 шт.от",
        "Доставка на 1 шт.до",
        "Стоимость от(руб.)",
        "Стоимость до (руб.)"
    ]



    const nameOfItem = (key: number) => names[key]
    return (
        <Card additionalClass='p-0 px-2'>



            <div className='absolute h-full top-0 right-[100.5%] text-[black] font-[500] flex items-center'>
                <span>{k}</span>
            </div>
            <div className='flex gap-2'>
                <span className=' font-[500]'>{catalogItem[0]}</span>
                <span>{catalogItem[1]}</span>
                <div className='flex flex-auto'>
                    <Icon_cross clickFunction={() => setswitch(prev => !prev)} />
                    <Link to={`/catalog/${catalogItem[0] + '-' + (k + 1)}`} className='absolute top-[5px] right-[30px]'>
                        <Icon_calc />
                    </Link>
                </div>
            </div>

            <div className='flex scrollTable flex-wrap' >
                {catalogItem.map((item, k) => k !== 0 && k !== 1 && item && switcher
                    &&
                    <div className='text-[0.8rem] tableItem'>
                        <div>
                            {nameOfItem(k)}
                        </div>
                        <div className=''>
                            {item}
                        </div>
                    </div>)}



            </div>
        </Card>
    );
};

export default Catalog_item;