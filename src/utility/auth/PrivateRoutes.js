import {  Navigate } from 'react-router-dom'
import Post from '../../components/post/post'

const PrivateRoutes=()=>{
    let auth=localStorage.getItem('email_id')
    return(
        auth? <Post/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes