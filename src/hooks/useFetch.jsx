import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meter, setMeter] = useState([]);

  useEffect(() => {
    async function fetchMeter() {
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setMeter(data.results);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message + " data");
      }
    }
    fetchMeter();
  }, [url]);

  return { meter, loading, error };
}

export default useFetch;
