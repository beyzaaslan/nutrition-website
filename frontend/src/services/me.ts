import axios from "axios";
import Cookies from "js-cookie";

export const getCurrentUser = async () => {
  try {
    const token = Cookies.get("x-auth-token");
    console.log(token);
    const response = await axios.get("http://localhost:3000/api/auth/me", {
      headers: { "x-auth-token": token },
    });
    console.log("response-me", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Kullanıcı bilgileri alınamadı:", error);
    throw error;
  }
};
