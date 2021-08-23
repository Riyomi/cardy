const FormField = ({ name, type }) => {
  return (
    <div className="field-wrapper">
      <label htmlFor={name}>{name}</label>
      <input type={type} name={name} />
    </div>
  );
};

export default FormField;
