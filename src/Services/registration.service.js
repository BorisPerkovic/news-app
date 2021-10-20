import  { REGISTRATION_URL } from "../Constants/endpoints";

class RegistrationService {
  async requestRegister(setDisplayModal ,setIsLoading, setErrorMessage, enteredName, enteredLastname, enteredEmail, enteredPassword, enteredRepeatPassword) {

    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({
        name: enteredName,
        lastname: enteredLastname,
        email: enteredEmail,
        password: enteredPassword,
        re_password: enteredRepeatPassword
      }),
    };

    setIsLoading(true);
    const response = await fetch(REGISTRATION_URL, requestOptions);
    const data = await response.json();
    if (data === "User exists") {
      setIsLoading(false);
      setErrorMessage("User with E-mail address " + enteredEmail + " already exists!");
    } else {
      setIsLoading(false);
      setDisplayModal(true);
    }
  };
};

export const registrationService = new RegistrationService();