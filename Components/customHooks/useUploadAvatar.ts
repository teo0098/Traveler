import { useMutation } from "@apollo/client";
import {CHANGE_USER_PHOTO} from "../../lib/graphql/client/mutations";
import {useRef, useState} from "react";



const useUploadAvatar = () => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [base64ImgString, setBase64ImgString] = useState<String | ArrayBuffer | null>("");

    const [uploadPhoto, uploadStatus] = useMutation(CHANGE_USER_PHOTO, {
        onError: () => {},
    });

    const getBase64 = (file:File) =>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setBase64ImgString(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    const handleOnSubmit = ({ file }: { refreshToken: string, file: string }) => {
        getBase64(imageRef.current.files[0]);
        uploadPhoto({
            variables: {
                refreshToken: localStorage.getItem('refreshToken'),
                file: base64ImgString
            },
        });
    }

    return { handleOnSubmit, uploadStatus, imageRef };
};

export default useUploadAvatar;
