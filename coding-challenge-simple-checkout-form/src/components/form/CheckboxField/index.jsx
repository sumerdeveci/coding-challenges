import { Field } from 'formik';
import './style.sass';

export const CheckboxField = ({ children, className, name, label, error }) => (
  <div className={`field ${className ?? ''}`}>
    <div className="control">
      <label className="checkbox">
        <Field type="checkbox" name={name} /> {label}
      </label>
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
);
