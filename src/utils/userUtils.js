// utils/userUtils.js
// Purpose: Utility functions for user management and age-appropriate content

export const getUserFromStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const getAgeGroup = () => {
  const user = getUserFromStorage();
  return user?.ageGroup || null;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token") && !!localStorage.getItem("user");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Age-appropriate content helpers
export const getContentForAge = (content) => {
  const ageGroup = getAgeGroup();

  if (!ageGroup || !content[ageGroup]) {
    return content.default || content["9-14"] || "";
  }

  return content[ageGroup];
};

export const getAgeGroupLabel = (ageGroup) => {
  switch (ageGroup) {
    case "4-8":
      return "Younger Kids (4-8 years)";
    case "9-14":
      return "Older Kids (9-14 years)";
    case "15-18":
      return "Teens (15-18 years)";
    default:
      return ageGroup;
  }
};
