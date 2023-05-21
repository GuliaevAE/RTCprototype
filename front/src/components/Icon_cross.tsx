import { Icon } from '@iconify/react/dist/iconify.js';


interface IIconProps {
    clickFunction: ()=>void
}

const Icon_cross = ({clickFunction}:IIconProps) => {
    return (
        <div onClick={clickFunction} className='absolute top-[5px] right-[5px] flex justify-center align-center 
        hover:scale-[1.2]  hover:rotate-[45deg] transition-all'>
            <Icon height="24" icon="ic:baseline-plus" className='' />
        </div>
    );
};

export default Icon_cross;