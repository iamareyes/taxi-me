import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TripCard from './TripCard';
import { connect, getTrips, messages } from '../services/TripService';


const updateToast = (trip) => {
  let driverName = null;
  if (trip.status === 'STARTED') {
    driverName = `${trip.driver.first_name} ${trip.driver.last_name}`;
    toast.info(`${driverName} is coming to pick you up.`);
  } else if (trip.status === 'IN_PROGRESS') {
    driverName = `${trip.driver.first_name} ${trip.driver.last_name}`;
    toast.info(`${driverName} is headed to your destination.`);
  } else if (trip.status === 'COMPLETED') {
    driverName = `${trip.driver.first_name} ${trip.driver.last_name}`;
    toast.info(`${driverName} has dropped you off.`);
  }
};


function RiderDashboard (props) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    connect();
      const subscription = messages.subscribe((message) => {
        setTrips(prevTrips => [
          ...prevTrips.filter(trip => trip.id !== message.data.id),
          message.data
        ]);
        updateToast(message.data);
      });
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, [setTrips]);

  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    };
    loadTrips();
  }, []);

  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return (
        trip.driver !== null &&
        trip.status !== 'REQUESTED' &&
        trip.status !== 'COMPLETED'
      );
    });
  };

  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <TripCard
        title='Current Trip'
        trips={getCurrentTrips()}
        group='rider'
        otherGroup='driver'
      />
      <TripCard
        title='Recent Trips'
        trips={getCompletedTrips()}
        group='rider'
        otherGroup='driver'
      />
    </>
  );
}

export default RiderDashboard;
