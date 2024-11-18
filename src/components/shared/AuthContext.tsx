import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the user object based on your response structure
interface User {
  id: number;
  email: string;
  name: string;
  // Add other fields as required by your user object
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with the defined types
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
   
//     if (token) {
   
//       api.get('/validate-token')
//         .then(response => {
//           if (response.data.valid) {
//             setUser(response.data.user); 
//           } else {
//             localStorage.removeItem('token');
//           }
//         })
//         .catch(() => {
//           localStorage.removeItem('token');
//         });
//     }
//   }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
      }),
    });

    const content = await response.json();
    if (content.status === 'true') {
      localStorage.setItem('token', content.jwt);
      setUser(content.user); 
    } else {
      throw new Error(content.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
