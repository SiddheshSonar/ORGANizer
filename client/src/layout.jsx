// import './globals.css'
import { ToastContainer } from 'react-toastify';
// import NavB from './auth/components/navB';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'hck',
    description: 'Generated for hck',
}

const Layout = ({ children }) => {
    return (
        <>
            test
            <ToastContainer />
            {children}
        </>
    )
}

export default Layout