import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import TripCard from './TripCard';
import { isRider } from '../services/AuthService';
import { getTrips } from '../services/TripService';

function Rider (props) {
  const [trips, setTrips] = useState([]);

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

  if (!isRider()) {
    return <Navigate to='/' />;
  }
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

export default Rider;
