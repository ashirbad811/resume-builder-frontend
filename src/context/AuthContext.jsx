import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');
        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                Cookies.remove('user');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
            const { token, user } = res.data;
            Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Login failed' };
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, { username, email, password });
            const { token, user } = res.data;
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Registration failed' };
        }
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
