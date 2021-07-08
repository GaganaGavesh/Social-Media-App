import React from 'react';

const AuthContext = React.createContext<any>({
    name: 'guest'
});

export default AuthContext;