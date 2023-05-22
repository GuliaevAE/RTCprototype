

export const cardHoverFunction = (event: React.MouseEvent<HTMLElement>, animSwicther: boolean) => {
    const { currentTarget } = event
    const target = currentTarget.getBoundingClientRect()
    const gorizontalPercentage = (event.clientX - target.x) / target.width * 100
    const verticalPercentage = (event.clientY - target.y) / target.height * 100

    const amplituda = 10
    const ver = verticalPercentage / 100 * amplituda * 2
    const gor = gorizontalPercentage / 100 * amplituda * 2
    animSwicther && event.currentTarget.animate({
        transform: `rotateX(${- ver + amplituda}deg) rotateY(${gor - amplituda}deg)`,
        // background: `radial-gradient(circle at ${gorizontalPercentage}% ${verticalPercentage}%, rgba(255, 255, 255, 0.15) 11%, rgba(66, 66, 66, 0.097) 57%)`,
        // zIndex: 2

    }, {
        duration: 150, fill: "forwards"
    })
}


export const cardLeaveFunction = (e: React.MouseEvent<HTMLElement>, animSwicther: boolean) => {
    animSwicther && e.currentTarget.animate({
        transform: `none`,
        // zIndex: 0
        // backgroundImage: `radial-gradient(circle at 1% 1%, rgba(255, 255, 255, 0.15) 11%, rgba(66, 66, 66, 0.097) 57%)`,


    }, {
        duration: 1000, fill: "forwards", easing: 'ease-out'
    })
}