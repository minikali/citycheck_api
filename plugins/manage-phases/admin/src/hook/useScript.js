import { useEffect, useState } from "react";

const useScript = url => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAr2ugrwLtCWxdkM1qLJbgbCPzQqr9oC14&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.log("Could not load Google places Autocomplete");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
  return [isLoaded];
};

export default useScript;
