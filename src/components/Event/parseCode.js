import style from './style.css';

const parseWeatherCode = (code, time) => {
   switch (code) {
      case 0:
         if (time.split(":")[0] > 18 || time.split(":")[0] < 6)
            return { icon: 'clear_night', name: 'Clear', style: style.darkblue };
         return { icon: 'sunny', name: 'Clear', style: style.orange };
      case 45:
      case 48:
         return { icon: 'foggy', name: 'Foggy', style: style.darkblue };
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
         return { icon: 'rainy', name: 'Rain', style: style.blue };
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
         return { icon: 'weather_snowy', name: 'Snow', style: style.blue };
      case 95:
      case 96:
      case 99:
         return { icon: 'thunderstorm', name: 'Thunderstorm', style: style.grey };
      default:
         return { icon: 'cloud', name: 'Cloudy', style: style.grey };
   }
};

export default parseWeatherCode;