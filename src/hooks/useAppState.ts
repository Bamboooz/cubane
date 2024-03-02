import { useState, useEffect } from 'react';
import { defaultAppState } from '../const/state';
import { AppState } from '../state/appState';

const useLocalStorage = (key: string): [string, (newValue: any) => void] => {
    // Get the initial value from localStorage (as a string)
    const initial = localStorage.getItem(key) || defaultAppState[key as keyof AppState];
  
    // State to hold the current value
    const [value, setValue] = useState(initial);
  
    // Effect to update localStorage when the value changes
    useEffect(() => {
      localStorage.setItem(key, value);
    }, [key, value]);
  
    // Function to update the value and trigger a rerender
    const updateValue = (newValue: any) => {
      setValue(newValue);
    };
  
    return [value, updateValue];
  };

export { useLocalStorage };
