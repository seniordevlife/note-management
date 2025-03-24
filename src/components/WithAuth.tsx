import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper = (props: P) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }, [router]);
        if (loading) {
            return <Loading />;
        }
        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
