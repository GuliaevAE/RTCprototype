import React from 'react';
import Card from '../Card';
import { changePrice_uan_from, changePrice_uan_to } from '../../../store/slices/goodsSlice';
import { useAppDispatch } from '../../../store/hooks';
import SecondStep_WBrent_from from './SecondStep_WBrent_from';
import SecondStep_costCalculation from './SecondStep_costCalculation';
import SecondStep_WBrent_to from './SecondStep_WBrent_to';

const SecondStep = () => {
    const dispatch = useAppDispatch()

    const inputHandler_price_uan_from = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changePrice_uan_from(Number(e.target.value)))
    const inputHandler_price_uan_to = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changePrice_uan_to(Number(e.target.value)))


    return (
        <section className='Second_card flex flex-col gap-[4vmin] mt-[4vmin]'>
            <div className='card_title text-[1.2rem]'>
                Второй этап
            </div>
            <div className='flex flex-col gap-[4vmin]'>
                <div className='flex gap-[4vmin] flex-col md:flex-row'>
                    <Card additionalClass='h-[fit-content]'>
                        <span className='text-[rgb(239, 239, 239)] font-[700] text-[.9rem]'>Новые цены (ю)</span>
                        <div className='flex gap-2 h-fit'>
                            <div className='flex-1 text-[.8rem] w-[max-content]'>
                                Цена от (ю)
                            </div>
                            <input type="number" className='' onInput={inputHandler_price_uan_from} />
                        </div>
                        <div className='flex'>
                            <div className='flex-1 text-[.8rem] w-[max-content]'>
                                Цена до (ю)
                            </div>
                            <input type="number" className='' onInput={inputHandler_price_uan_to} />
                        </div>

                    </Card>

                    <SecondStep_costCalculation />

                </div>

                <div className='flex gap-[4vmin] flex-col md:flex-row'>
                    <SecondStep_WBrent_from />
                    <SecondStep_WBrent_to />
                </div>

            </div>

        </section>
    );
};

export default SecondStep;