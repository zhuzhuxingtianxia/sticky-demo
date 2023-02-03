import React, { useState, useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

}

export const useTimeout = (callback, delay) => {
    const savedCallback = React.useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });
    
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay != null) {
            let id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay])
}