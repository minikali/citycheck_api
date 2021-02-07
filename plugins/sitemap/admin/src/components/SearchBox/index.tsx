import React, { useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AsyncSelect from 'react-select/async';
import Spinner from 'react-bootstrap/Spinner';
import debounce from 'debounce-promise';
import './style.css';

interface Props {
  addr: any;
  setAddr: (v: any) => void;
  onFocus?: () => void;
  placeholder?: string;
}

const defaultProps = {
  onFocus: null,
  placeholder: '',
};

const SearchBox = ({ addr, setAddr, onFocus, placeholder }: Props) => {
  const [show, setShow] = useState(false);
  const [provider] = useState(new OpenStreetMapProvider());

  const fetchData = async (inputValue) => {
    try {
      const results = await provider.search({ query: inputValue });
      return results.map(({ label, x, y, bounds }) => ({
        label,
        bounds,
        position: { lat: y, lng: x },
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const loadOptions = (inputValue) => {
    if (inputValue.length < 3) return [];
    return new Promise((resolve) => {
      resolve(fetchData(inputValue));
    });
  };

  const loadOptionsDebounce = debounce(loadOptions, 1000, {
    leading: true,
  });

  const handleInputChange = (v: string) => {
    if (v?.length > 2) setShow(true);
    else setShow(false);
  };

  const handleChange = (v) => {
    setAddr(v);
  };

  const LoadingIndicator = () => (
    <div className='loading-indicator'>
      <Spinner animation='border' />
    </div>
  );

  return (
    <div className='search-box'>
      <AsyncSelect
        placeholder={placeholder}
        value={addr}
        className='async-select'
        classNamePrefix='async-select'
        loadOptions={(inputValue) => loadOptionsDebounce(inputValue)}
        cacheOptions
        onChange={handleChange}
        isClearable
        onInputChange={handleInputChange}
        menuIsOpen={show}
        components={{ LoadingIndicator }}
        onFocus={onFocus}
      />
    </div>
  );
};

SearchBox.defaultProps = defaultProps;
export default SearchBox;
