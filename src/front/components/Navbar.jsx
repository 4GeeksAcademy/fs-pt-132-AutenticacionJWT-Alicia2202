import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Navbar = () => {
	const {store} = useGlobalReducer()
	const navigate = useNavigate();
	const handlePrivate = () => {
		const tokenInStorage = localStorage.getItem('token');
		const userInStore = store.user;
		if (tokenInStorage && userInStore){
			navigate("/private");

		}else {
			navigate("/auth");
		}
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">

					<Link to="/auth">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>

				<div className="ml-auto">
					{/* <button>
					{localStorage.getItem('token')&&<onclick to="/private">
						Private
					</Link>}
					</button> */}
					<button className="btn btn-secondary" onClick={handlePrivate}>
    					Private
					</button>
				</div>
			</div>
		</nav>
	);
};