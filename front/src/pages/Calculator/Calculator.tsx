// import Circle from '../../components/Circle';
import Circle from '../../components/Circle';
import { useAppSelector } from '../../store/hooks'
import { OriginalStaf } from '../../store/slices/goodsSlice';

import FirstStep from './first_step/FirstStep';
import SecondStep from './second_step/SecondStep';
const Calculator = () => {
    const originalStaf = useAppSelector(OriginalStaf)
    return (
        <div className='py-[3vmin] px-[5vmin]'>
            <Circle/>
            {originalStaf && <FirstStep />}
            {originalStaf && <SecondStep />}
        </div>
    );
};

export default Calculator;