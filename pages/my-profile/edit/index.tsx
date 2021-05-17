import Head from 'next/head'
import * as Styled from "./styledIndex";
import Credentials from "../../../Components/Credentials/Credentials";
import SettingsMenu from "../../../Components/SettingsMenu/SettingsMenu";
import ChangePhoto from "../../../Components/ChangePhoto/ChangePhoto";

const index : React.FC = () => (
    <>
        <Head>
            <title>Traveler • Edytuj profil</title>
        </Head>
        <Credentials padding={"0"}>
        <Styled.SettingsBox>
        <SettingsMenu/>
    <Styled.ContentBox>
        <ChangePhoto/>
    </Styled.ContentBox>
        </Styled.SettingsBox>
        </Credentials>

    </>
)

export default index