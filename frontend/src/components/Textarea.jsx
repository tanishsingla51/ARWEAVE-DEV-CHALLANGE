// components/Textarea.js

import "./components.css";

export const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="textarea"
    />
  );
};
