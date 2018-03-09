import React from 'react';

const getPersonName = (name, locationName) => {
  let location = locationName;
  if (location) location = location.replace('Kindergarten', 'KG');
  if (name && location) {
    return <div>{name} (<i>{location}</i>)</div>;
  } else if (name) {
    return <div>{name}</div>;
  } else if (location) {
    return <div><i>{location}</i></div>;
  }
  return <div>-</div>;
};

export default getPersonName;
