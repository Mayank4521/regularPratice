import React from "react";

const FormGroup = ({label,placeholder,value,onChange}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={label}
      />
    </div>
  );
};

export default FormGroup;
