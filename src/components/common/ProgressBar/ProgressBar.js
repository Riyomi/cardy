const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-progress"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
