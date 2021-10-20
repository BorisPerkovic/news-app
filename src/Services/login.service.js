
import { LOGIN_URL } from "../Constants/endpoints";

class LoginService {
  async requestLogin(
    setIsLoading,
    setErrorMessage,
    enteredEmail,
    enteredPassword
  ) {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    };

    setIsLoading(true);
    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();
    if (data === "Cannot find user" || data === "Incorrect password") {
      setIsLoading(false);
      setErrorMessage("Email or password are not correct!");
    } else {
      setIsLoading(false);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify({
        name: data.users_name,
        lastname: data.users_lastname,
        email: data.users_email
      }));
      window.location.assign("https://borisperkovic.github.io/news-app");
    }
  }
}

export const loginService = new LoginService();