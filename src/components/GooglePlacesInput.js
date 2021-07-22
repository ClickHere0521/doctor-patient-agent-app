import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder='Search'
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAth0N53d9cpF0fq8ZWg9ILEucE4W2TzYU',
        language: 'en',
      }}
      keyboardShouldPersistTaps='always'
      listViewDisplayed={false}
      fetchDetails={true}
    />
  );
};

export default GooglePlacesInput;