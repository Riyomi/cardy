const Form = ({ title, sideText, fields, extra }) => {
  return (
    <div className="form-wrapper">
      <div className="sidebar">{sideText}</div>
      <div className="form-main">
        <h2>{title}</h2>
        <form className="user-form">
          {fields.map((field, index) => (
            <div className="field-wrapper" key={index}>
              <label htmlFor={field.name}>{field.name}</label>
              <input type={field.type} name={field.name} />
            </div>
          ))}
          <input type="submit" value={title} className="submit-btn" />
          <span>{extra}</span>
        </form>
      </div>
    </div>
  );
};

export default Form;
