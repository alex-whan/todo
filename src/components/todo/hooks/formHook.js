import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    e.target.reset();
    callback(values);
    const item = {};
    setValues({ item });
  };

  const handleChange = e => {
    e.persist();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [handleSubmit, handleChange, values];
};

export default useForm;
