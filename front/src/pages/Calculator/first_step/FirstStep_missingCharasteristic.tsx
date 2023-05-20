import { useAppSelector } from '../../../store/hooks'
import { OriginalStaf } from '../../../store/slices/goodsSlice';

interface IDataOption_item {
    name: string,
    value: string
}

const FirstStep_missingCharasteristic = () => {

    const data = useAppSelector(OriginalStaf)


    const missingСharacteristics = (options: { name: string, value: string }[]) => {
        const arr: string[] = []
        !options.find((x: IDataOption_item) => x.name === 'Вес товара с упаковкой (г)') && !options.find((x: IDataOption_item) => x.name === 'Вес товара без упаковки (г)') && arr.push('Вес товара')
        !options.find((x: IDataOption_item) => x.name === 'Длина упаковки') && arr.push('Длина упаковки')
        !options.find((x: IDataOption_item) => x.name === 'Ширина упаковки') && arr.push('Ширина упаковки')
        !options.find((x: IDataOption_item) => x.name === 'Высота упаковки') && arr.push('Высота упаковки')
        return arr

    }
    return (
        <>
            <span className='text-[rgb(239, 239, 239)] font-[700]'>Отсутствующие параметры:</span>
            {missingСharacteristics(data.options).map((mis: string) => <span key={mis} className='animation_missingCharasteristic font-[500]'>{mis}</span>)}
        </>
    );
};

export default FirstStep_missingCharasteristic;