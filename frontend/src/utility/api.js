const handleResponse = async (response) => {
  const json = await response.json();
  if (!response.ok) {
    console.error(json.message);
    return { success: false, message: json.message };
  }
  else {
    return { success: true, message: json };
  }
}


export const login = async (username, password) => {
  let response;
  try {
    response = await fetch("http://127.0.0.1:3001/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
  } catch (err) {
    return err;
  }
  return handleResponse(response);
}

export const register = async (username, password) => {
  let response;
  try {
    response = await fetch("http://127.0.0.1:3001/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
  } catch (err) {
    return err;
  }
  return handleResponse(response);
}

export const validateToken = async () => {
  let response;
  try {
    response = await fetch('http://127.0.0.1:3001/validateToken', {
      credentials: 'include'
    });
  } catch (err) {
    return err;
  }
  return handleResponse(response);
}