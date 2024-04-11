export const clickSound = () => {
    const clickSound = new Audio('/assets/sounds/click.wav');
    clickSound.volume = 0.5;
    clickSound.play();
}