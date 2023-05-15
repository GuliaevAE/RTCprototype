export const cardHoverFunction = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event
    const target = currentTarget.getBoundingClientRect()
    const gorizontalPercentage = (event.pageX - target.x) / target.width * 100
    const verticalPercentage = (event.pageY - target.y) / target.height * 100
    event.currentTarget.animate({
        background: `radial-gradient(circle at ${gorizontalPercentage}% ${verticalPercentage}%, rgba(255, 255, 255, 0.125) 11%, rgba(66, 66, 66, 0.097) 57%)`
    }, {
        duration: 20, fill: "forwards"
    })
}

export const cardLeaveFunction = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.animate({
        background: `rgba(0, 0, 0, 0)`
    }, {
        duration: 100, fill: "forwards" , easing:'ease-out'
    })
}