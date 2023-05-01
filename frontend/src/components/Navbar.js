import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  	return (
		<div>
			<header>
				<div className="container">
					<Link to="/">
						<h1>Workout Buddy AUTH</h1>
					</Link>
					<nav>
						<div>
							<Link to="/login">Login</Link>
							<Link to="/signup">Sign Up</Link>
						</div>
					</nav>
				</div>
			</header>
		</div>
  	)
}
