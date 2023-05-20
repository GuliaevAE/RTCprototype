import React, { useState, useEffect, useMemo } from 'react';

const Circle = () => {
    const [switcher, setSwitch] = useState<boolean>(false)
    const colors = Array(21).fill("");

    const getFileName = (index: number) => {
        return `key-${index}`;
    }

    const getUrl = (index: number) => `https://assets.codepen.io/1468070/${getFileName(index)}.wav`;


    const keys = useMemo(()=> colors.map((_item, index) => {
        const audio = new Audio(getUrl(index));
        audio.volume = 0.15;
        return audio;
    }),[]);

    useEffect(() => {
        const circleConteiner = document.getElementById('Circle')
        const allCircles = circleConteiner?.getElementsByTagName('div')
        if (allCircles)
            for (const circle of allCircles) {
                circle.addEventListener("animationiteration", (event: AnimationEvent) => {
                    const target = (event.target as HTMLElement).id
                    keys[Number(target)].play()
                });
            }

    }, [keys])






    const clickOnCircle = (e: React.MouseEvent) => {
        const target = e.currentTarget
        target.animate([{
            transform: 'scale(1.1)'
        }, {
            transform: 'scale(1)'
        }, {
            transform: 'scale(1.1)'
        }], {
            duration: 200, easing: 'ease',
        })
        setSwitch(prev => !prev)
    }

    return (
        <div id='Circle' onClick={clickOnCircle} className={`circles ${switcher && 'active'}`}>
            {[1, 2, 3, 4, 5, 6].map(x => <div key={x} id={String(x)}></div>)}
           
        </div>
    );
};

export default Circle;