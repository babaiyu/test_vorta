import { useEffect, useState } from "react";
import { getLocations, getTreatments } from "../services/api";

export default function itemHook() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  async function _getItem() {
    await Promise.all([
      getTreatments().then((res) => res.data),
      getLocations().then((res) => res.data),
    ]).then((res) => {
      setTreatments(res[0]?.treatments);
      setLocations(res[1]?.locations);
    });
  }

  useEffect(() => {
    _getItem();
  }, []);

  return { treatments, locations };
}
