import axios from "axios";
import { handleAuth, SEARCH_API } from "./search";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    const authResponse = await handleAuth();

    if (authResponse && authResponse.success && authResponse.access_token) {
      const config = {
        headers: {
          Authorization: `Bearer ${authResponse.access_token}`,
          "x-apikey": process.env.search_api_key,
        },
        params: {
          stockId: id,
        },
      };

      const response = await axios.get(SEARCH_API, config);

      if (response && response.data) {
        return res.json({
          success: true,
          data: response.data,
          token: authResponse.access_token,
        });
      } else {
        return res.json({ success: false });
      }
    }
  } catch (error) {
    console.log("error", error)
    return res.json({ success: false });
  }
}
