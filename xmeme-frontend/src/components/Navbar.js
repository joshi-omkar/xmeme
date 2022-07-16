

// basic navigation bar with a logo recieved as props. (bootstrap styling used)
const Navbar = props => (
    <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
            <img src={props.image} width="30" height="30" className="d-inline-block align-top" alt="" />
            Xmeme
    </a>
    </nav>
)

export default Navbar;