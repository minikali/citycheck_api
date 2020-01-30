import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  const {
    domId,
    label,
    placeholder,
    value,
    setValue,
    type,
    autoComplete,
    role,
    className,
    disabled,
    onKeyDown,
    onBlur,
    onChange,
    "aria-autocomplete": ariaAutoComplete,
    "aria-expanded": ariaExpanded,
    required
  } = props;
  return (
    <div className="input">
      <label className="label" htmlFor={domId}>
        {label}
        <input
          id={domId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange || (e => setValue(e.target.value))}
          autoComplete={autoComplete}
          role={role}
          className={className}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          aria-autocomplete={ariaAutoComplete}
          aria-expanded={ariaExpanded}
          required={required}
        />
      </label>
    </div>
  );
};

Input.defaultProps = {
  placeholder: "",
  type: "text",
  label: "",
  value: "",
  autoComplete: null,
  role: null,
  "aria-autocomplete": null,
  "aria-expanded": null,
  className: null,
  disabled: null,
  onKeyDown: null,
  onBlur: null,
  onChange: null,
  required: false
};

Input.propTypes = {
  domId: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  role: PropTypes.string,
  "aria-autocomplete": PropTypes.string,
  "aria-expanded": PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default Input;
