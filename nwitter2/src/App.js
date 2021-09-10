import React, { useState } from 'react';
import {
    useAuthState,
    useAuthDispatch,
    testAction,
} from 'contexts/AuthContext';

const App = () => {
    const [input, setInput] = useState('');
    const authDispatch = useAuthDispatch();
    const { test } = useAuthState();

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setInput(value);
    };

    const onClick = () => {
        authDispatch(testAction({ test: input }));
    };

    return (
        <>
            <div>
                <h1>앱</h1>
                <input onChange={onChange} />
                <button onClick={onClick}>변경</button>
                <div>{test}</div>
            </div>
        </>
    );
};

export default App;
