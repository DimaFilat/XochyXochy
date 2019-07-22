/* eslint-disable import/prefer-default-export */
export const USERS_AC = {
  LOG_IN: 'LOG_IN',
  REG_IN: 'REG_IN',
  LOG_OUT: 'LOG_OUT',
  SENT_FETCH: 'SENT_FETCH',
  RCWD_FETCH: 'RCWD_FETCH'
};

export const logInAC = () => ({
  type: USERS_AC.LOG_IN
});

export const logOutAC = () => ({
  type: USERS_AC.LOG_OUT
});

export const regInAC = () => ({
  type: USERS_AC.REG_IN
});

export const fetchSent = () => ({
  type: USERS_AC.SENT_FETCH
});
export const fetchRcvd = data => {
  return { type: USERS_AC.RCWD_FETCH, user: data };
};
export const fetchThunk = (user, path) => {
  return async dispatch => {
    dispatch(fetchSent());
    const response = await fetch(`${path}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user })
    });
    const userData = await response.json();
    console.warn(userData);
    dispatch(fetchRcvd(userData));
    // };
  };
};
