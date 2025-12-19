import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const ContextProvider = ({children}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [userToken, setUserToken] = useState(
    localStorage.getItem("token")
  );

  //Blog States
  const [publicBlogs, setPublicBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth hydration completed
    setLoading(false);
  }, []);


  return (
  <AuthContext.Provider value={{
      user,
      setUser,
      userToken,
      setUserToken,
      navigate,
      
      //public blog
      publicBlogs,
      setPublicBlogs,
      //my blogs
      blogs,
      setBlogs,

      loading,
      setLoading
      }}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}


