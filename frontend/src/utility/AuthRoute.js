import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({children: children, ...props}) {
  const [elem, setElem] = useState(null);
  const validateToken = async () => {
    const response = await fetch('http://127.0.0.1:3001/validateToken', {
      credentials: 'include'
    });
    const res = await response.json();
    console.log(res.data)
    return res.data;
  }

  useEffect(() => {
    const v = validateToken();
    if (v) {
      setElem(children);
    } else {
      setElem(<Navigate to={`/`}/>);
    }
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
