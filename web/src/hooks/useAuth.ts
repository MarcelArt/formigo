import { create } from 'zustand';

interface AuthState {
    accessToken?: string;
    setAccessToken: (token: string) => void;
}

const useAuth = create<AuthState>()((set) => ({
    accessToken: undefined,
    setAccessToken: (token: string) => set({ accessToken: token }),
}));
export default useAuth;