import { useSpring } from 'react-spring';

const useFadeAnimation = () => useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

const useSlideAnimation = () =>
    useSpring({
        config: { tension: 1500, friction: 20 },
        from: { x: -60, opacity: 0 },
        to: { x: 0, opacity: 1 },
        reset: true,
    });

// const useHoverAnimation = (hover, active) =>
//     useSpring({
//         config: { tension: 1100, friction: 30 },
//         to: {
//             transform: hover ? 'scale(1.02)' : 'scale(1)',
//         },
//         reset: true,
//     });

export { useFadeAnimation, useSlideAnimation };
