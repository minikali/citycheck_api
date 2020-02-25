/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const Initializer = ({ updatePlugin }) => {
  const ref = useRef();
  ref.current = updatePlugin;

  useEffect(() => {
    ref.current(pluginId, 'isReady', true);
  }, []);
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAr2ugrwLtCWxdkM1qLJbgbCPzQqr9oC14&libraries=places";
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => {
  //     console.log("Google places Autocomplete loaded");
  //   };
  //   script.onerror = () => {
  //     console.log("Could not load Google places Autocomplete");
  //   };
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // });
  return null;
};

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
