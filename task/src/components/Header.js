import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from 'react-router-dom';


const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className='header'>
            {/* <h1 style={headingStyle}> */}
            <h1>
                {title}
            </h1>
            { location.pathname ==='/' ? <Button
                            color={showAdd ? 'red' : 'green'} 
                            text={showAdd ? 'Close' : 'Add'} 
                            onClick={onAdd}
                        /> : ''
            }
            
        </header>
    )
}

// sets Task Tracker as default title if nothing is passes in props
Header.defaultProps = {
    title: "Task Tracker",
}

// sets a constraint that title needs to be a string
Header.propTypes = {
    title: PropTypes.string,
}


// to set style for the title. use this way of styling only when dynamic styling is required
// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }

export default Header
