import { logout } from "./handleLocalStorage"

const handleRefresh = () => {
  if (performance.navigation.type === 1) {
      logout()
  } 
};

export default handleRefresh;