import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({children: children, ...props}) {
  const [elem, setElem] = useState(null);
  const validateToken = async () => {
    const response = await fetch('http://127.0.0.1:3001/validateToken', {
      credentials: 'include'
    });
    const res = await response.json();
    if (res.success) {
      setElem(children);
    } else {
      setElem(<Navigate to={'/login'}/>);
    }
  }

  useEffect(() => {
    validateToken();
  });

  return (
      <>
        {
          elem
        }
      </>
  );
}

export default AuthRoute;
