import { useEffect, useState } from 'react';
import axios from 'axios';

const useAjax = () => {
  // const [list, setList] = useState([]);
  const [options, request] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function ajax() {
      if (!options) {
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios(options);
        setResponse(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    ajax();
  }, [options]);

  // Need to RETURN this to be able to use it on the other end
  return {
    request,
    response,
    error,
    isLoading,
  };
};

export default useAjax;
