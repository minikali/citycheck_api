import React, { useState, useEffect, useRef } from 'react';
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
  const { address, setAddress, coord, setCoord, id, disabled } = props;
  const [style, setStyle] = useState(redOutline);
  
  const getCoord = (addr, bool) => {
    console.log(addr);
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

        if (bool) {
          setTimeout(
            () => {
              getCoord(addr);
            }
            ,
            1000
          );
        }
        setCoord(null);
        setStyle(redOutline);
      });
  }

  const handleChange = address => {
    setAddress(address);
    getCoord(address, false);

  };

  const handleSelect = address => {
    setAddress(address);
    getCoord(address, false);
  };

  const handleError = (status, clearSuggestions) => {
    setCoord(null);
    setStyle(redOutline);
    console.error(status);
    clearSuggestions();
  };

  useEffect(() => {
    getCoord(address, true);
  }, []);


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
          disabled={disabled}
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
