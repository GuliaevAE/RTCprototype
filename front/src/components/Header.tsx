import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AnimSwitcher, changeAnimSwitcher } from '../store/slices/goodsSlice';

const Header = () => {
    const loc = useLocation()
    const dispatch = useAppDispatch()
    const animSwitcher = useAppSelector(AnimSwitcher)

    return (
        <div className='flex gap-2 text-[1.1rem] font-[600] fixed z-[99] left-[0] px-[5vmin] top-[4vmin] w-full '>
            <Link to={'/catalog'}><span className={`px-2 py-1 border-solid border-[black] border-[2px] rounded-[10px] ${loc.pathname === '/catalog' ? 'bg-[black] text-[white]' : 'bg-[white] text-[black]'} `}>Каталог</span></Link>
            <Link to={'/'}><span className={`px-2 py-1 border-solid border-[black] border-[2px] rounded-[10px] ${loc.pathname === '/' ? 'bg-[black] text-[white]' : 'bg-[white] text-[black]'} `}>Калькулятор</span></Link>
            <div className=''>
                <span onClick={() => dispatch(changeAnimSwitcher())} className={`${animSwitcher ? 'bg-[black] text-[white]' : 'bg-[white] text-[black]'} border-solid border-[2px] border-[black] px-2 py-1  rounded-[10px]`}>{animSwitcher ? 'ON' : 'OFF'}</span>
            </div>
        </div>
    );
};

export default Header;