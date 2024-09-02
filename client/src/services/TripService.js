import axios from 'axios';
import { share, catchError } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { of } from 'rxjs';
import { getAccessToken } from './AuthService';


let _socket; // new
export let messages; // new


export const connect = () => {
    if (!_socket || _socket.closed) {
      const token = getAccessToken();
      _socket = webSocket(`ws://${process.env.REACT_APP_BASE_URL}/taxi/?token=${token}`);
      messages = _socket.pipe(share(),
        catchError(error => {
          _socket.complete()
          console.log("Ran into a Error")
          console.log(error)
          return of();
        })
      );
      messages.subscribe(message => console.log(message))
    }
};

export const createTrip = (trip) => {
  connect();
  const message = {
    type: 'create.trip',
    data: trip
  };
  _socket.next(message);
};

export const getTrip = async (id) => {
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/trip/${id}/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (response) {
    if(response.response.status === 401){
          window.alert("Session has expired being redirected to login page. \n Please login again")
          window.localStorage.removeItem('taxi.auth');
      }
    return { response, isError: true };
  }
};

export const getTrips = async () => {
  const url = `http://${process.env.REACT_APP_BASE_URL}/api/trip/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };

  } catch (response) {
      if(response.response.status === 401){
            window.alert("Session has expired being redirected to login page. \n Please login again");
            window.localStorage.removeItem('taxi.auth');
            window.location.reload();
      }
    return { response, isError: true };
  }
};

export const updateTrip = (trip) => {
  connect();
  const message = {
    type: 'update.trip',
    data: trip
  };
  _socket.next(message);
};
