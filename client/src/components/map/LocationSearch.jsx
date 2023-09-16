import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


import "./locationSearch.css";

const LocationSearchInput = ({setLatLng}) => {
    const [address, setAddress] = useState(null);

    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        setAddress(address);

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setLatLng({
                    latitude: latLng.lat,
                    longitude: latLng.lng
                });
                // console.log('Success', latLng);
            })
            .catch(error => console.error('Error', error));
    };

    const clearAddress = () => {
        setAddress('');
        setLatLng(null);
    };

    return (
        <PlacesAutocomplete
            className="mb-4"
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        type='search'
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container p-2 bg-gray-400 rounded-md">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
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
            )}
        </PlacesAutocomplete>
    );
}

export default LocationSearchInput;
