import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const HourGlass = forwardRef(function HourGlass({ onEnd }, ref) {
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
    }, []);

    return (
        <div ref={myRef} className="hourglass active">
            <div className="top"></div>
            <div className="bottom"></div>
        </div>
    );
});

export default HourGlass;