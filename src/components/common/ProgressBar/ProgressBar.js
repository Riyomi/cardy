const ProgressBar = ({ progress, styles }) => {
  return (
    <div className="progress-bar" style={styles}>
      <div
        className="progress-bar-progress"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
