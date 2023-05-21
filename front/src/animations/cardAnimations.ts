// export const cardHoverFunction = (event: React.MouseEvent<HTMLElement>) => {
// const { currentTarget } = event
// const target = currentTarget.getBoundingClientRect()
// const gorizontalPercentage = (event.pageX - target.x) / target.width * 100
// const verticalPercentage = (event.pageY - target.y) / target.height * 100
// event.currentTarget.animate({
//     background: `radial-gradient(circle at ${gorizontalPercentage}% ${verticalPercentage}%, rgba(255, 255, 255, 0.125) 11%, rgba(66, 66, 66, 0.097) 57%)`
// }, {
//     duration: 20, fill: "forwards"
// })
// }

// export const cardLeaveFunction = (e: React.MouseEvent<HTMLElement>) => {
// e.currentTarget.animate({
//     background: `rgba(0, 0, 0, 0)`
// }, {
//     duration: 100, fill: "forwards" , easing:'ease-out'
// })
// }

export const cardHoverFunction = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event
    const target = currentTarget.getBoundingClientRect()
    const gorizontalPercentage = (event.clientX - target.x) / target.width * 100
    const verticalPercentage = (event.clientY - target.y) / target.height * 100

    const amplituda = 10

    const ver = verticalPercentage / 100 * amplituda * 2
    const gor = gorizontalPercentage / 100 * amplituda * 2
    event.currentTarget.animate({
        transform: `rotateX(${- ver + amplituda}deg) rotateY(${gor - amplituda}deg)`,
        // background: `radial-gradient(circle at ${gorizontalPercentage}% ${verticalPercentage}%, rgba(255, 255, 255, 0.15) 11%, rgba(66, 66, 66, 0.097) 57%)`,
        // zIndex: 2

    }, {
        duration: 150, fill: "forwards"
    })
}


export const cardLeaveFunction = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.animate({
        transform: `rotateX(0deg) rotateY(0deg)`,
        // zIndex: 0
        // backgroundImage: `radial-gradient(circle at 1% 1%, rgba(255, 255, 255, 0.15) 11%, rgba(66, 66, 66, 0.097) 57%)`,


    }, {
        duration: 1000, fill: "forwards", easing: 'ease-out'
    })
}