export function getProgress(experience) {
  const level = parseInt(Math.sqrt(experience / 50)) + 1;
  const value = Math.sqrt(experience / 50);
  const progress = ((value - Math.floor(value)) * 100).toFixed(2);

  return {
    level: level > 99 ? 99 : level,
    progress: progress,
  };
}
