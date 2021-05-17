import Head from "next/head";
import Credentials from "../../../../Components/Credentials/Credentials";
import * as StyledSettings from "../styledIndex";
import SettingsMenu from "../../../../Components/SettingsMenu/SettingsMenu";
import ChangeUsername from "../../../../Components/ChangeUsername/ChangeUsername";


const index : React.FC = () => (
    <>
        <Head>
            <title>Traveler • Zmień nazwę</title>
        </Head>
        <Credentials padding={"0"}>
            <StyledSettings.SettingsBox>
                <SettingsMenu/>
                <StyledSettings.ContentBox>

<ChangeUsername/>

                </StyledSettings.ContentBox>
            </StyledSettings.SettingsBox>
        </Credentials>

    </>
)

export default index;