import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthenticate = () => {
  const navigate = useNavigate();

  const verifyUser = async () => {
    const endPoint = `/user/verify`
    try {
      const res = await fetch(endPoint);
      if (res.status === 401) {
        return navigate('/')
      }
      if (!res.ok) {
        throw Error('failed to authenticate user')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {verifyUser()})

  return;
}

export default useAuthenticate;