import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'
import * as SC from './styledLayout'

const Layout : React.FC = ({ children }) => (
    <SC.StyledLayout>
        <div>
            <Navigation />
            {children}
        </div>
        <Footer />
    </SC.StyledLayout>
)

export default Layout