import AuthContextProvider from 'contexts/AuthContext';

export const ContextProvider = (...Provider) => {
    const RootContextProvider = ({ children }) => {
        let temp = children;
        Provider.forEach((Prov) => {
            temp = <Prov>{temp}</Prov>;
        });
        return temp;
    };

    return ({ children }) => (
        <RootContextProvider>{children}</RootContextProvider>
    );
};

const RootContext = ContextProvider(AuthContextProvider);

export default RootContext;
