import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import {Link} from 'react-router-dom';

const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if (userEmail === "test@gmail.com") {
        return children
    }
    return (   
        <section style={{height: "80vh"}}>
                <div className='container pt-20'>
                    <h1>Permision Denied</h1>
                    <p>This page can only be viewed by an Admin user.</p>
                    <br />
                    <Link to="/">
                        <button className='btn-full py-3 px-4'>
                            &larr; Back To Home
                        </button>
                    </Link>
                    
                </div>
        </section>
        
    )
};

export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if (userEmail === "test@gmail.com") {
        return children
    }
    return null
};

export default AdminOnlyRoute;