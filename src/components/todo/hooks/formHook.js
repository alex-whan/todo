import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    e.target.reset();
    callback(values);
    // setValues({});
  };

  const handleInputChange = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  return { handleSubmit, handleInputChange, values };
};

export default useForm;
