import axios from "axios";
import {IMGBB_API_KEY} from '../env/env'

export const imgToUrl = async(e)=>{
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.display_url;
    } catch (error) {
      throw new Error('Failed to fetch image');
    }
}