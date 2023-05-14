import { useAppSelector } from '../../store/hooks'
import { OriginalStaf } from '../../store/slices/goodsSlice';

import FirstStep_card from './FirstStep_card';
const FirstStep = () => {
    const originalStaf = useAppSelector(OriginalStaf)
    return (
        <div className='py-[2vmin] px-[2vmin]'>
            {originalStaf && <FirstStep_card />}
        </div>
    );
};

export default FirstStep;