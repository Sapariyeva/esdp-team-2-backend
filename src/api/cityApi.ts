import axios from 'axios';
interface CityData {
  name: string;
}
const getKazakhstanCities = async () => {
  try {
    const response = await axios.get('http://api.geonames.org/searchJSON?country=kz&featureClass=P&username=avemaryplus');
    const kazakhstanCities = response.data.geonames.map((city: CityData) => ({
      name: city.name,
    }));

    return kazakhstanCities;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export default getKazakhstanCities;
