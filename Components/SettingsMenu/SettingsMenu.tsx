import * as Styled from "./StyledSettingsMenu";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader";
import Link from 'next/link'



const SettingsMenu : React.FC = () => {
    const [activeUrl, setActiveUrl] = useState("");
    useEffect(()=>{
        if (/edit/.test(window.location.href))
            setActiveUrl('edit');
        if(/change-password/.test(window.location.href))
            setActiveUrl('editPassword');
        if(/change-username/.test(window.location.href))
            setActiveUrl('editUsername');
    }, []);
    if(activeUrl=='edit') {
        return (
            <Styled.OptionsContainer>
                <Styled.SettingsOption className={"active"} active={true}><Link href="/my-profile/edit"><a>Edytuj profil</a></Link></Styled.SettingsOption>
                <Styled.SettingsOption><Link href="/my-profile/edit/change-password"><a>Zmień hasło</a></Link></Styled.SettingsOption>
                <Styled.SettingsOption><Link href="/my-profile/edit/change-username"><a>Zmień nazwę</a></Link></Styled.SettingsOption>
            </Styled.OptionsContainer>
        );
    }else if(activeUrl=='editPassword'){
        return (
            <Styled.OptionsContainer>
                <Styled.SettingsOption><Link href="/my-profile/edit"><a>Edytuj profil</a></Link></Styled.SettingsOption>
                <Styled.SettingsOption className={"active"} active={true}>Zmień hasło</Styled.SettingsOption>
                <Styled.SettingsOption><Link href="/my-profile/edit/change-username"><a>Zmień nazwę</a></Link></Styled.SettingsOption>
            </Styled.OptionsContainer>
        );
    } else if(activeUrl=='editUsername'){
    return (
        <Styled.OptionsContainer>
            <Styled.SettingsOption><Link href="/my-profile/edit"><a>Edytuj profil</a></Link></Styled.SettingsOption>
            <Styled.SettingsOption><Link href="/my-profile/edit/change-password"><a>Zmień hasło</a></Link></Styled.SettingsOption>
            <Styled.SettingsOption className={"active"} active={true}>Zmień nazwę</Styled.SettingsOption>
        </Styled.OptionsContainer>
    );
}else{
        return(
        <Loader/>
        );
    }
}

export default SettingsMenu