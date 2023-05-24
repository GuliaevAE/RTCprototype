import React, { useEffect, useState } from 'react';
import { fetching } from '../api';
import { useAppDispatch } from '../../../store/hooks';
import { changeAddedConcurents } from '../../../store/slices/goodsSlice';

const SecondStep_concurents_image = ({ index }: { index: string }) => {
    const [name, setName] = useState<string>('')
    const [img, setImg] = useState('')
    const [count, setCount] = useState<number>(1)
    const [maxCount, setMax] = useState<number>(0)

    const dispatch = useAppDispatch()
    useEffect(() => {
        setImg('')
        fetching(String(index))
            .then(res => {
                setImg(res.links.link_images.images_link)
                setMax(res.media.photo_count)
                setName(res.imt_name)
            }
            )

    }, [index])

    const add = () => {
        name&&  dispatch(changeAddedConcurents({ index, name }))
    }

    return (
        <>
            {img && <div className='w-[16vw] flex flex-col text-center relative'>
                <img src={img + count + '.jpg'} alt="" />
                <span className='absolute top-[100%] left-[50%] translate-x-[-50%]' onClick={add}>{index}</span>

            </div>}
        </>
    );
};

export default SecondStep_concurents_image;




