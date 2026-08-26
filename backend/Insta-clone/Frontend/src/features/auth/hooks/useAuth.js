import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe} from "../services/auth.api";



export const useAuth = () => {
  const { setUser, user, setLoading, loading } = useContext(AuthContext);

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await register(username, email, password);
      setUser(data.user);
    } catch (err) {
      throw err
    } finally {
      setLoading(false);
    }
  };
  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const data = await login(username, password);
      setUser(data.user);
    } catch (err) {
        throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (err) {
        console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return ({user,loading,handleRegister,handleLogin,handleGetMe});
};
