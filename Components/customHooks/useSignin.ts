import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LOGIN_USER } from '../../lib/graphql/client/mutations';

const useSignin = () => {

    const [login, loginStatus] = useMutation(LOGIN_USER, { onError: () => {} })
    const router = useRouter()

    useEffect(() => {
        if (loginStatus.data) {
            const { refreshToken, accessToken } = loginStatus.data.loginUser
            localStorage.setItem('refreshToken', refreshToken)
            sessionStorage.setItem('accessToken', accessToken)
            router.push('/')
        }
    }, [loginStatus.data])

    const handleOnSubmit = ({ email, password } : {email : string, password : string}) => 
        login({
            variables: {
                email,
                password
            }
        });

    return { handleOnSubmit, loginStatus }
}

export default useSignin