import { useSpring } from 'react-spring';

export const useFadeAnimation = () => useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
export const useSlideAnimation = () =>
    useSpring({
        config: { tension: 3000, friction: 35 },
        from: { x: -35, opacity: 0 },
        to: { x: 0, opacity: 1 },
        reset: true,
    });
