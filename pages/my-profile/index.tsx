import Head from "next/head";
import Credentials from "../../Components/Credentials/Credentials";
import {useQuery} from "@apollo/client";
import useGetUserData from "../../Components/customHooks/useGetUserData";
import {useEffect, useState} from "react";


interface UserInfoType {
    username: string;
    avatar: string;

}

const index : React.FC = () => {
    const { loadData } = useGetUserData()
    const [userInfo, setUserInfo] = useState<UserInfoType>({username: ""});
    useEffect(()=>{
        loadData({refreshToken: localStorage.getItem('refreshToken')}).then((res)=>{
setUserInfo(res.data.getUserData)
        })
    },[])

    return(
    <>
        <Head>
            <title>Traveler • Mój profil</title>
        </Head>
        <Credentials padding={"25"}>
            <img src={userInfo.avatar}/>
           Nazwa użytkownika: {userInfo.username}
        </Credentials>
    </>
    );
}
export default index