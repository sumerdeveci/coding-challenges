import { Field } from 'formik';
import './style.sass';

export const InputField = ({ className, name, label, placeholder = '', error }) => (
  <div className="field">
    <label id={`label-${name}`} className="label">
      {label}
    </label>
    <div className="control">
      <Field
        className={`input ${error ? 'is-danger' : ''}`}
        type="text"
        name={name}
        placeholder={placeholder}
        aria-labelledby={`label-${name}`}
      />
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
);
