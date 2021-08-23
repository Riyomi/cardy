import FormField from '../FormField/FormField';

const Form = ({ title, sideText, fields, extra, footer }) => {
  return (
    <div className="form-wrapper">
      <div className="sidebar">{sideText}</div>
      <div className="form-main">
        <h2>{title}</h2>
        <form className="user-form">
          {fields.map((field, index) => (
            <FormField key={index} name={field.name} type={field.type} />
          ))}
          <p className="extra-text">{extra}</p>
          <input type="submit" value={title} className="submit-btn" />
          {footer}
        </form>
      </div>
    </div>
  );
};

export default Form;
