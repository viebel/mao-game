import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const HourGlass = forwardRef(function HourGlass({ onEnd, size }, ref) {
    const intervalRef = useRef(null);
    const myRef = useRef(null);
    const startTimer = () => {
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        intervalRef.current = setTimeout(() => onEnd(), 10000);
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