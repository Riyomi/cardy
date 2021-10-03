interface Props {
  name: string;
  type: 'text' | 'password' | 'number' | 'email';
  value: number | string;
  classes?: string;
  setValue: Function;
  required: boolean;
}

const FormField = ({
  name,
  type,
  value,
  classes,
  setValue,
  required,
}: Props) => (
  <div className={classes || 'field-wrapper'}>
    <label htmlFor={name}>{name}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
    />
  </div>
);

export default FormField;
