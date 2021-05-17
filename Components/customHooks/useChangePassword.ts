import { useMutation } from '@apollo/client';

import {CHANGE_PASSWORD} from '../../lib/graphql/client/mutations';

const useChangePassword = () => {

    const [changePassword, changeStatus] = useMutation(CHANGE_PASSWORD, { onError: () => {} })

    const handleOnSubmit = ({ email, currentPassword, newPassword } : {email : string, currentPassword : string, newPassword: string}) =>
        changePassword({
            variables: {
                email,
                currentPassword,
                newPassword
            }
        });

    return { handleOnSubmit, changeStatus }
}

export default useChangePassword