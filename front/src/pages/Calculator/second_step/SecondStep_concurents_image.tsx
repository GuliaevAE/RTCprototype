import { useEffect, useState } from 'react';
import { fetching } from '../api';
import { useAppDispatch } from '../../../store/hooks';
import { changeAddedConcurents } from '../../../store/slices/goodsSlice';

const SecondStep_concurents_image = ({ index }: { index: string }) => {
    const [name, setName] = useState<string>('')
    const [img, setImg] = useState('')
    const [linksArr, setLinks] = useState<{ link_wb: string, link_mp: string, }>()
    const [count, setCount] = useState<number>(1)
    const [maxCount, setMax] = useState<number>(0)

    const dispatch = useAppDispatch()
    useEffect(() => {
        setImg('')
        setCount(1)
        fetching(String(index))
            .then(res => {
                setImg(res.links.link_images.images_link)
                setMax(res.media.photo_count)
                setName(res.imt_name)
                setLinks({ link_wb: res.links.link_wb, link_mp: res.links.link_mp })
            }
            )

    }, [index])

    const add = () => {
        name && linksArr && dispatch(changeAddedConcurents({ index, name, links: { link_wb: linksArr.link_wb, link_mp: linksArr.link_mp } }))
    }



    const imageHoverFunction = (event: React.MouseEvent<HTMLElement>) => {
        const { currentTarget } = event
        const targetPos = currentTarget.getBoundingClientRect()
        const gorizontalPercentage = (event.clientX - targetPos.x) / targetPos.width * 100
        const verticalPercentage = (event.clientY - targetPos.y) / targetPos.height * 50
        currentTarget.animate({
            height: '200%',
            transform: `translateY(-${verticalPercentage}%)`,
            objectPosition: `${gorizontalPercentage}%`
        }, {
            duration: 150, fill: "forwards"
        })
    }

    const imageLeaveFunction = (event: React.MouseEvent<HTMLElement>) => {
        const { currentTarget } = event
        currentTarget.animate({
            height: '100%',
            transform: 'none',
            objectPosition: 'none'
        }, {
            duration: 150, fill: "forwards"
        })
    }

    return (
        <>
            <div className={`w-[16vw] aspect-[1/1.3] flex flex-col text-center imgContainer border-solid border-[1px] border-[black]  relative ${img && 'active'}`}>
                {img &&
                    <div className='overflow-hidden'>
                        {maxCount &&
                            <div className='flex flex-col self-center gap-1 absolute top-[3px] right-[3px] z-[3]'>
                                {Array(maxCount<6?maxCount:5).fill('').map((_x, key) => <div key={'img' + key} onClick={() => setCount(key + 1)}
                                    className={`aspect-square border-[1px] border-solid border-[black] rounded-[20%]  ${key + 1 === count ? 'bg-[white]' : 'bg-[black]'} h-[10px] hover:scale-[2] hover:bg-[purple] transition-all `} />)}
                            </div>}
                        <img onMouseMove={imageHoverFunction} onMouseLeave={imageLeaveFunction} src={img + count + '.jpg'} alt={img + count} />
                    </div>}
                <div className='absolute w-full bg-[] top-[100%] left-[50%] translate-x-[-50%]  flex justify-between px-[5%]' >
                    <span className='cursor-pointer' onClick={add}>{index}</span>

                </div>
            </div>
        </>
    );
};

export default SecondStep_concurents_image;




