//companyContext
import { createContext, useState, useContext, useEffect } from 'react';
import { getClientDetail } from '../Services/ClientsService';
import { useAuthContext } from './AuthContext';

const CompanyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.company && user.company.id) {
            getClientDetail(user.company.id)
                .then((data) => {
                    setCompany(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    const value = {
        company,
        loading,
        error,
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};


export default CompanyContextProvider;

