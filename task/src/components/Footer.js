import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
const Footer = () => {
    const location = useLocation()
    return (
        <footer>
            <p> Copyright & Copy: 2021</p>
            {location.pathname !=='/about' ? <Link to = "/about">About</Link> : ''}
            {location.pathname !=='/about' ? <br/> : '' }
            <a href = "https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=4922s">GitHub</a>    
        </footer>
    )
}

export default Footer
