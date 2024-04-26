export type AnimationState = {
  id?: number;
};

export const carAnimation = (
  car: HTMLElement,
  distance: number,
  animationTime: number
): AnimationState => {
  const animatedCar = car;
  let start: number | null = null;
  const state: AnimationState = {};

  function step(timestamp: number) {
    if (state.id === 0) return;
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    animatedCar.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = requestAnimationFrame(step);
    }
  }
  state.id = requestAnimationFrame(step);
  return state;
};
