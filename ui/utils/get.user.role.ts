export const getUserRole = () => {
  if (window && typeof window !== "undefined") {
    const role = window.localStorage.getItem("role");
    return role ? role : "defaultRole";
  }
  return "defaultRole";
};
