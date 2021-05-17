import Head from "next/head";
import Credentials from "../../../../Components/Credentials/Credentials";
import * as StyledSettings from "../styledIndex";
import SettingsMenu from "../../../../Components/SettingsMenu/SettingsMenu";
import ChangePassword from "../../../../Components/ChangePassword/ChangePassword";

const index : React.FC = () => (
        <>
            <Head>
                <title>Traveler • Zmień hasło</title>
            </Head>
            <Credentials padding={"0"}>
                <StyledSettings.SettingsBox>
                    <SettingsMenu/>
                    <StyledSettings.ContentBox>

                        <ChangePassword/>



                    </StyledSettings.ContentBox>
                </StyledSettings.SettingsBox>
            </Credentials>

        </>
)

export default index;