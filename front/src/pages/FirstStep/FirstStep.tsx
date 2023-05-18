import Circle from '../../components/Circle';
import { useAppSelector } from '../../store/hooks'
import { OriginalStaf } from '../../store/slices/goodsSlice';

import FirstStep_card from './FirstStep_card';
const FirstStep = () => {
    const originalStaf = useAppSelector(OriginalStaf)
    return (
        <div className='py-[3vmin] px-[5vmin]'>
            <Circle/>
            {originalStaf && <FirstStep_card />}
        </div>
    );
};

export default FirstStep;