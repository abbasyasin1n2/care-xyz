'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LocationSelector({ value, onChange }) {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState({ divisions: true, districts: false, cities: false, areas: false });

  // Load divisions on mount
  useEffect(() => {
    fetchDivisions();
  }, []);

  // Load districts when division changes
  useEffect(() => {
    if (value.division) {
      fetchDistricts(value.division);
    } else {
      setDistricts([]);
      setCities([]);
      setAreas([]);
    }
  }, [value.division]);

  // Load cities when district changes
  useEffect(() => {
    if (value.district) {
      fetchCities(value.division, value.district);
    } else {
      setCities([]);
      setAreas([]);
    }
  }, [value.district]);

  // Load areas when city changes
  useEffect(() => {
    if (value.city) {
      fetchAreas(value.division, value.district, value.city);
    } else {
      setAreas([]);
    }
  }, [value.city]);

  const fetchDivisions = async () => {
    setLoading(prev => ({ ...prev, divisions: true }));
    try {
      const res = await fetch('/api/locations?type=divisions');
      const data = await res.json();
      setDivisions(data.data || []);
    } catch (error) {
      console.error('Error fetching divisions:', error);
    }
    setLoading(prev => ({ ...prev, divisions: false }));
  };

  const fetchDistricts = async (division) => {
    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const res = await fetch(`/api/locations?type=districts&division=${encodeURIComponent(division)}`);
      const data = await res.json();
      setDistricts(data.data || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
    setLoading(prev => ({ ...prev, districts: false }));
  };

  const fetchCities = async (division, district) => {
    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const res = await fetch(`/api/locations?type=cities&division=${encodeURIComponent(division)}&district=${encodeURIComponent(district)}`);
      const data = await res.json();
      setCities(data.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoading(prev => ({ ...prev, cities: false }));
  };

  const fetchAreas = async (division, district, city) => {
    setLoading(prev => ({ ...prev, areas: true }));
    try {
      const res = await fetch(`/api/locations?type=areas&division=${encodeURIComponent(division)}&district=${encodeURIComponent(district)}&city=${encodeURIComponent(city)}`);
      const data = await res.json();
      setAreas(data.data || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
    setLoading(prev => ({ ...prev, areas: false }));
  };

  const handleDivisionChange = (division) => {
    onChange({
      division,
      district: '',
      city: '',
      area: ''
    });
  };

  const handleDistrictChange = (district) => {
    onChange({
      ...value,
      district,
      city: '',
      area: ''
    });
  };

  const handleCityChange = (city) => {
    onChange({
      ...value,
      city,
      area: ''
    });
  };

  const handleAreaChange = (area) => {
    onChange({
      ...value,
      area
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Division */}
        <div className="space-y-2">
          <Label htmlFor="division">Division *</Label>
          <Select value={value.division} onValueChange={handleDivisionChange} disabled={loading.divisions}>
            <SelectTrigger id="division">
              <SelectValue placeholder={loading.divisions ? "Loading..." : "Select Division"} />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Select 
            value={value.district} 
            onValueChange={handleDistrictChange} 
            disabled={!value.division || loading.districts}
          >
            <SelectTrigger id="district">
              <SelectValue placeholder={loading.districts ? "Loading..." : value.division ? "Select District" : "Select Division First"} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Select 
            value={value.city} 
            onValueChange={handleCityChange} 
            disabled={!value.district || loading.cities}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder={loading.cities ? "Loading..." : value.district ? "Select City" : "Select District First"} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area */}
        <div className="space-y-2">
          <Label htmlFor="area">Area *</Label>
          <Select 
            value={value.area} 
            onValueChange={handleAreaChange} 
            disabled={!value.city || loading.areas}
          >
            <SelectTrigger id="area">
              <SelectValue placeholder={loading.areas ? "Loading..." : value.city ? "Select Area" : "Select City First"} />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
