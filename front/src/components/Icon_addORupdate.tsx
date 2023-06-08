import { Icon } from '@iconify/react/dist/iconify.js';
import { useParams } from 'react-router-dom';

interface IIconProps {
    clickFunction: () => void,
    status: boolean
}


const Icon_addORupdate = ({ clickFunction, status }: IIconProps) => {
    const { itemId } = useParams()
  
    return (
        <div onClick={() => !status && clickFunction()} className={`absolute top-[5px] right-[30px]
         flex justify-center align-center z-[3]
           hover:scale-[1.2]   transition-all
           ${status && 'text-[green]'}`}>
            {itemId ? <Icon height="20" icon="fluent:save-24-filled" className='rounded-[50%]' />
                : <Icon height="20" icon="gridicons:add" />}
        </div>
    );
};

export default Icon_addORupdate;