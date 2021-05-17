import { useMutation } from '@apollo/client';

import {CHANGE_USERNAME} from '../../lib/graphql/client/mutations';

const useChangeUsername = () => {

    const [changeUsername, changeStatus] = useMutation(CHANGE_USERNAME, { onError: () => {} })

    const handleOnSubmit = ({ email, username } : {email : string, username : string}) =>
        changeUsername({
            variables: {
                email,
                username,
            }
        });

    return { handleOnSubmit, changeStatus }
}

export default useChangeUsername