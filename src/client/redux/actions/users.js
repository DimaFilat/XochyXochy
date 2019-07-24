/* eslint-disable import/prefer-default-export */
export const USERS_AC = {
  SESSION_CHECK: 'SESSION_CHECK',
  REG_IN: 'REG_IN',
  LOG_OUT: 'LOG_OUT',
  SENT_FETCH: 'SENT_FETCH',
  RCWD_FETCH: 'RCWD_FETCH',
  ADD_DATE: 'ADD_DATE'
};

export const addDate = () => {
  type: USERS_AC.ADD_DATE;
};

export const regInAC = () => ({
  type: USERS_AC.REG_IN
});

export const fetchSent = () => ({
  type: USERS_AC.SENT_FETCH
});
export const fetchRcvd = data => {
  return { type: USERS_AC.RCWD_FETCH, user: data };
};
export const logOutThunk = () => {
  return async dispatch => {
    dispatch(fetchSent());
    const response = await fetch('/users/signout');
    const userData = await response.json();
    console.warn(userData);

    dispatch(fetchRcvd(userData));
  };
};
export const sessionCheckThunk = () => {
  return async dispatch => {
    dispatch(fetchSent());
    const response = await fetch('/users/status');
    const userData = await response.json();
    // console.warn(userData);

    dispatch(fetchRcvd(userData));
  };
};
export const fetchThunk = (user, path) => {
  return async dispatch => {
    dispatch(fetchSent());

    try {
      const response = await fetch(`${path}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ ...user })
      });
      const userData = await response.json();

      console.warn(userData);
      dispatch(fetchRcvd(userData));
    } catch (err) {}

  };
};


