import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const HourGlass = forwardRef(function HourGlass({ onEnd, size, duration }, ref) {
    console.log('onEnd', onEnd);
    const intervalRef = useRef(null);
    const myRef = useRef(null);
    const startTimer = () => {
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        intervalRef.current = setTimeout(() => onEnd(), duration*1000);
    }

    const restart = () => {
        console.log('Restarting the timer');
        myRef.current.classList.remove('active');
        setTimeout(() => { myRef.current.classList.add('active'); }, 1);
        startTimer();
    };

    useImperativeHandle(ref, () => {
        return {
            restart() {
                restart();
            },
        }
    }, []);

    useEffect(() => {
        startTimer();
        myRef.current.style.setProperty('--size', size + 'vmin');
        myRef.current.style.setProperty('--timer-duration', duration + 's');

        myRef.current.classList.add('active');
    }, []);

    return (
        <div ref={myRef} className="hourglass">
            <div className="top"></div>
            <div className="bottom"></div>
        </div>
    );
});

export default HourGlass;