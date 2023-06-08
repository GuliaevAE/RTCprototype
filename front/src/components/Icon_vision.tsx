import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';


interface IIconProps {
    clickFunction: ()=>void
}

const Icon_cross = ({clickFunction}:IIconProps) => {
    const [switcher, setSwitch] = useState<boolean>(false)
    return (
        <div onClick={()=>{clickFunction();setSwitch(prev=>!prev)}} className=' absolute top-[5px] right-[5px] flex justify-center align-center z-[3]
        hover:scale-[1.2]   transition-all'>
            <Icon height="20" icon={!switcher?"ri:eye-2-fill":"ri:eye-2-line"} className='' />
        </div>
    );
};

export default Icon_cross;