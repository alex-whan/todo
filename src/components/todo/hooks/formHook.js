import { useState } from 'react';

const useForm = callback => {
  const [item, setItem] = useState({});

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    e.target.reset();
    callback(item);
    setItem({});
  };

  const handleInputChange = e => {
    e.persist();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return [handleSubmit, handleInputChange, item];
};

export default useForm;
