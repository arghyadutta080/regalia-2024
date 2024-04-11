export const hoverSound = () => {
    const hoverSound = new Audio('/assets/sounds/hover.wav');
    hoverSound.volume = 0.5;
    hoverSound.play();
}