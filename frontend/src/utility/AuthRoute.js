import { useEffect } from 'react';

function AuthRoute({children: children, ...props}) {
  useEffect(() => {
    const validateToken = async () => {
      const valid = await fetch('http://localhost:3001/validateToken');
      console.log(valid)
    }
    validateToken();
  });

  return (
      <>
        {children}
      </>
  );
}

export default AuthRoute;
