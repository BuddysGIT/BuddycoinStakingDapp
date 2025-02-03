import { convertSnakeToCamelCase } from '../../internal/utils/convertSnakeToCamelCase.js';
import { getApiKey } from '../../internal/utils/getApiKey.js';
import { ONRAMP_API_BASE_URL } from '../constants.js';

/**
 * Returns list of countries supported by Coinbase Onramp, and the payment methods available in each country.
 */
async function fetchOnrampConfig() {
  const apiKey = getApiKey();
  const response = await fetch(`${ONRAMP_API_BASE_URL}/buy/config`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  const responseJson = await response.json();
  return convertSnakeToCamelCase(responseJson.data);
}
export { fetchOnrampConfig };
//# sourceMappingURL=fetchOnrampConfig.js.map
