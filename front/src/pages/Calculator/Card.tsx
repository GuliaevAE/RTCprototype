import { cardHoverFunction, cardLeaveFunction } from '../../animations/cardAnimations';

type ICardProps = {
    children: string | JSX.Element | JSX.Element[],
    additionalClass? :string
}

const Card = ({ children, additionalClass }: ICardProps) => {
    return (
        <div onMouseMove={cardHoverFunction} onMouseLeave={cardLeaveFunction} className={` ${additionalClass?additionalClass:''}   background_shadow_animation  flex flex-col p-3`}>
          <div className='glass'></div>
          
            {children}
        </div>
    );
};

export default Card;