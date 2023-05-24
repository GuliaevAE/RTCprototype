import { useEffect, useState } from 'react';
import { fetching } from '../api';
import { useAppDispatch } from '../../../store/hooks';
import { changeAddedConcurents } from '../../../store/slices/goodsSlice';

const SecondStep_concurents_image = ({ index }: { index: string }) => {
    const [name, setName] = useState<string>('')
    const [img, setImg] = useState('')
    const [linksArr, setLinks] = useState<{ link_wb: string, link_mp: string, }>()
    // const [count, setCount] = useState<number>(1)
    const count = 1
    // const [maxCount, setMax] = useState<number>(0)

    const dispatch = useAppDispatch()
    useEffect(() => {

        setImg('')
        fetching(String(index))
            .then(res => {
                setImg(res.links.link_images.images_link)
                // setMax(res.media.photo_count)
                setName(res.imt_name)
                setLinks({ link_wb: res.links.link_wb, link_mp: res.links.link_mp })
            }
            )

    }, [index])

    const add = () => {
        name && linksArr && dispatch(changeAddedConcurents({ index, name, links: { link_wb: linksArr.link_wb, link_mp: linksArr.link_mp } }))
    }

    return (
        <>
            {img && <div className='w-[16vw] flex flex-col text-center relative'>
                <img src={img + count + '.jpg'} alt={img + count}/>
                <span className='absolute top-[100%] left-[50%] translate-x-[-50%] cursor-pointer' onClick={add}>{index}</span>
            </div>}
        </>
    );
};

export default SecondStep_concurents_image;




