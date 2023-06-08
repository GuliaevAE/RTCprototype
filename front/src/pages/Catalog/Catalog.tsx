import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../store/hooks';
import { changeOriginalStaf } from '../../store/slices/goodsSlice';
import Catalog_item from './Catalog_item';

const Catalog = () => {
    const [CatalogArray, setCatalog] = useState([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        axios.get('https://natalyshando.ru/catalog').then(res => {
            console.log(res.data)
            setCatalog(res.data)
        })



        dispatch(changeOriginalStaf(null))
    }, [dispatch])

    return (
        <div className='flex flex-col gap-[3vmin] py-[3vmin] px-[5vmin] items-end'> 
            <span className='text-black text-[2rem] font-[600] '>
                Каталог: расчет себестоимости
            </span>
            <div className={` flex flex-wrap gap-[2vmin] justify-between w-full`}>
                {CatalogArray.map((catalogItem: string[], k) => {
                    return catalogItem[0] &&
                        <div key={catalogItem[0] + k} className='w-full FirstStep_card'>
                            <Catalog_item catalogItem={catalogItem} k={k} />
                        </div>
                })}
            </div>

        </div>
    );
};

export default Catalog;