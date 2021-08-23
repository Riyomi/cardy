const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="benefit-card">
      <span className="material-icons-outlined benefit-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default BenefitCard;
