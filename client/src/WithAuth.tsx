import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect: any) {
    return () => {
        const [status, setStatus] = useState<{loading: Boolean, redirect: Boolean}>({loading: true, redirect: false});
        fetch('/checkToken')
        .then((res: any) => {
            if (res.status === 200) {
                setStatus({ ...status, loading: false });
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            setStatus({ loading: false, redirect: true });
        });
        const { loading, redirect } = status;
        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect/>;
    }
}