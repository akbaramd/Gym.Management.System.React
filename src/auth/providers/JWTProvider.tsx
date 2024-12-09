/* eslint-disable no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState
} from 'react';

import * as authHelper from '../_helpers';
import { type AuthModel, type UserModel } from '@/auth';

const API_URL = import.meta.env.VITE_APP_API_URL;

// Updated endpoints to match Swagger:
export const LOGIN_URL = `${API_URL}/api/auth/login`;
export const LOGOUT_URL = `${API_URL}/api/auth/logout`;
export const PROFILE_URL = `${API_URL}/api/auth/profile`;
export const SESSIONS_URL = `${API_URL}/api/auth/sessions`;
export const AVATAR_URL = `${API_URL}/api/auth/avatar`;

interface AuthContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  login: (mobileNumber: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
  // Removed register, requestPasswordResetLink, and changePassword methods since they are not defined in the provided Swagger.
  // Add them back if your API supports them and you know the correct endpoints and request bodies.
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  // Attach interceptor to include Bearer token when making authenticated requests
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (auth && auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    });
  }, [auth]);

  const verify = async () => {
    if (auth && auth.accessToken) {
      try {
        const { data: user } = await getUser();
        setCurrentUser(user);
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    } else {
      // No auth token means we can't verify
      setCurrentUser(undefined);
    }
  };

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const login = async (mobileNumber: string, password: string) => {
    try {
      const { data: authResult } = await axios.post(LOGIN_URL, {
        mobileNumber,
        password
      });
 
      saveAuth(authResult);

      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Login error: ${error}`);
    }
  };

  const getUser = async (): Promise<AxiosResponse<any>> => {
    return await axios.get<UserModel>(PROFILE_URL);
  };

  const logout = async () => {
    try {
      await axios.post(LOGOUT_URL);
    } catch (error) {
      // Even if logout fails on the server, we clear local auth.
      console.error('Logout error:', error);
    } finally {
      saveAuth(undefined);
      setCurrentUser(undefined);
    }
  };

  useEffect(() => {
    // Attempt verification on mount if we have an auth token
    if (auth && auth.accessToken) {
      verify().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        login,
        logout,
        verify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
