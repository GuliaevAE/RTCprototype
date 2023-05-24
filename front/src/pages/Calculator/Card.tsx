import { cardHoverFunction, cardLeaveFunction } from '../../animations/cardAnimations';
import { useAppSelector } from '../../store/hooks';
import { AnimSwitcher } from '../../store/slices/goodsSlice';

type ICardProps = {
    children: string | JSX.Element | JSX.Element[],
    additionalClass? :string
}

const Card = ({ children, additionalClass }: ICardProps) => {
const animSwicther = useAppSelector(AnimSwitcher)

    return (
        <div onMouseMove={(e)=>cardHoverFunction(e, animSwicther)} onMouseLeave={(e)=>cardLeaveFunction(e, animSwicther)} className={` background_shadow_animation  flex flex-col p-3 ${additionalClass?additionalClass:''}`}>
          <div className='glass'></div>
          
            {children}
        </div>
    );
};

export default Card;