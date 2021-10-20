import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './domains/auth';

import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Movies } from './pages/movies';
import { MovieDetailsPage } from './pages/movieDetails';

const Routes = () => {
    const { status } = useAuth();

    const authRoutes = (
        <Switch>
            <Route path="/movies/:movieId">
                <MovieDetailsPage />
            </Route>
            <Route path="/movies" exact>
                <Movies />
            </Route>
            <Route path="*">
                <Redirect
                    to={status !== 'authenticated' ? '/login' : '/movies'}
                />
            </Route>
        </Switch>
    )

    const unAuthRoutes = (
    <Switch>
        <Route path="/login">
            <LoginPage />
        </Route>
        <Route path="/register">
            <RegisterPage />
        </Route>
        <Route path="*">
                <Redirect
                    to={status !== 'authenticated' ? '/login' : '/movies'}
                />
        </Route>
    </Switch>
)

    return (
        <>
        {status === 'authenticated' ? authRoutes : unAuthRoutes}
        </>
    );
};

export default Routes;
