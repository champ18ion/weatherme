// useTemperatureConversion.js
import { useState, useEffect } from 'react';

const useTemperatureConversion = (unit, initialData) => {
  const [convertedData, setConvertedData] = useState(initialData);

  useEffect(() => {
    const convertTemperature = (temp) => {
      if (unit === 'metric') {
        // Convert to Celsius
        return temp;
      } else {
        // Convert to Fahrenheit
        return (temp * 9) / 5 + 32;
      }
    };

    // Convert temperature values in the data object
    const convertedDataObject = {
      ...initialData,
      main: {
        ...initialData.main,
        temp: convertTemperature(initialData.main.temp),
        temp_min: convertTemperature(initialData.main.temp_min),
        temp_max: convertTemperature(initialData.main.temp_max),
      },
    };

    setConvertedData(convertedDataObject);
  }, [unit, initialData]);

  return convertedData;
};

export default useTemperatureConversion;
