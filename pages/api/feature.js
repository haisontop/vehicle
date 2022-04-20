import axios from "axios";
import { handleAuth, SEARCH_API } from "./search";



export default async function handler(req, res) {
  try {
    const { searchId } = req.body;

    const FEATURE_API = `${process.env.base_autotrader_api}/service/stock-management/search/${searchId}/features`;

    const authResponse = await handleAuth();
    
    if (authResponse && authResponse.success && authResponse.access_token) {
      const config = {
        headers: {
          Authorization: `Bearer ${authResponse.access_token}`,
          "x-apikey": process.env.search_api_key,
        }
      };

      const response = await axios.get(FEATURE_API, config);

      if (response && response.data) {
        return res.json({
          success: true,
          data: response.data.features,
          token: authResponse.access_token,
        });
      } else {
        return res.json({ success: false });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false });
  }
}
