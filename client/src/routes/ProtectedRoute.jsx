import { Route, redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const ProtectRoute = ({ component: Component, ...rest }) => {
	const {
		authState: { isAuthenticated }
	} = useContext(AuthContext)
    
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<>
						<Component {...rest} {...props} />
					</>
				) : (
					redirect('/login')
				)
			}
		/>
	)
}

export default ProtectRoute;