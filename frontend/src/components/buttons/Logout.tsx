import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';

const Logout:React.FC = () => {
    const [signOut, loading,error] = useSignOut(auth);

    const router = useRouter();
    const handleLogout = () =>{
        router.push("/")
        signOut();
    }
    return (

        <button onClick={handleLogout}>Logout</button>
    )
}
export default Logout;