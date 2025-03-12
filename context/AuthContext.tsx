import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, Merchant, User } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthProps = {
    token: string | null;
    userInfo: User | {};
    merchantInfo: Merchant | {}; 
    message: string;
    onRegister: (email: string, first_name: string, last_name: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<void>;
    initialized: boolean;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [message, setMessage] = useState<string>('');
    const [userInfo, setUserInfo] = useState({});
    const [merchantInfo, setMerchantInfo] = useState({});
    const [exp, setExp] = useState<number | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const user = await AsyncStorage.getItem('userInfo');
            const merchant = await AsyncStorage.getItem('merchantInfo');

            if(user) {
                setUserInfo(JSON.parse(user));
            }

            if(merchant) {
                setMerchantInfo(JSON.parse(merchant));
            }
        };
        loadUser();
    }, []);

    const handleLogin = async (email: string, password: string): Promise<any> => {
        const result = await loginUser(email, password);
        const re = result.data;

        setMessage(re.data.message);
        if (result.error) {
            return { error: true, msg: re.data};
        }
        await AsyncStorage.setItem('userInfo', JSON.stringify(re.data.data));
        await AsyncStorage.setItem('merchantInfo', JSON.stringify(re.data.merchant_data));
        
        setUserInfo(JSON.parse(JSON.stringify(re.data.data)));
        setMerchantInfo(JSON.parse(JSON.stringify(re.data.merchant_data)));
        
        return result;
    };

    const handleLogout = async () => {
        setUserInfo({});
        setMerchantInfo({});
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('merchantInfo');
    }

    const value = {
        initialized,
        onLogin: handleLogin,
        onLogout: handleLogout,
        userInfo,
        merchantInfo,
        message
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};