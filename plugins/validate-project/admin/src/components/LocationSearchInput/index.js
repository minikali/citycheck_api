import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { InputText } from "@buffetjs/core";

const redOutline = {
  borderColor: "red"
}

const greenOutline = {
  borderColor: "lightgreen"
}

const LocationSearchInput = props => {
  const { address, setAddress, coord, setCoord, id } = props;
  const [style, setStyle] = useState(redOutline);

  const getCoord = addr => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setStyle(greenOutline);
        setCoord({
          lng: latLng.lng,
          lat: latLng.lat
        });
      })
      .catch(error => {
        console.error(error);
        setTimeout(
          () => {
            getCoord(addr);
          }
          ,
          1000
        );
        setCoord(null);
        setStyle(redOutline);
      });
  }

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    setAddress(address);
  };

  const handleError = (status, clearSuggestions) => {
    setCoord(null);
    setStyle(redOutline);
    console.error(status);
    clearSuggestions();
  };

  useEffect(() => {
    getCoord(address);
  }, [address]);

  // useEffect(() => {
  //   if (!coord) {
  //     console.log("coord null", id);
  //     getCoord(address);
  //   } else {
  //     console.log("coord not null", id);
  //   }
  // });

  const renderFx = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
    return (
      <div>
        <InputText
          id={`address-${id}`}
          name={"address"}
          placeholder={"Search an address"}
          type={"text"}
          value={address}
          onChange={({ target: { value } }) => {
            setState({ ...state, title: value });
          }}
          {...getInputProps({ style })}
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      onError={handleError}
      shouldFetchSuggestions={address.length > 3}
    >
      {renderFx}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;
