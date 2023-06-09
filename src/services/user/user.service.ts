interface userInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export const fetchAllRegisterUserList = () => {
  const registerUserList = localStorage.getItem("registerUserList");
  if (registerUserList) {
    return JSON.parse(registerUserList);
  }
};

export const userRegistration = (userData: userInterface) => {
  const registerUserList = fetchAllRegisterUserList() || [];
  registerUserList.push(userData);
  localStorage.setItem("registerUserList", JSON.stringify(registerUserList));
};
export const userLogin = (userData: userInterface) => {
  const registerUserList = fetchAllRegisterUserList() || [];
  const index = registerUserList?.findIndex(
    (user: userInterface) =>
      user.email === userData.email && user.password === userData.password
  );
  if (index === -1) {
    return false;
  }
  registerUserList[index].active = true;
  localStorage.setItem("registerUserList", JSON.stringify(registerUserList));
  return registerUserList[index];
};

export const logoutUser = () => {
  const registerUserList = fetchAllRegisterUserList() || [];
  const index = registerUserList?.findIndex(
    (user: userInterface) => user.active === true
  );
  if (index === -1) {
    return false;
  }
  registerUserList[index].active = false;
  localStorage.setItem("registerUserList", JSON.stringify(registerUserList));
};
