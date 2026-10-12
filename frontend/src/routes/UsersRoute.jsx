import { Navigate } from 'react-router';
import { useIsDesktop } from '../hooks/useIsDesktop';
import MobileUsersView from '../features/user/components/MobileUsersView';

export default function UsersRoute() {
    const isDesktop = useIsDesktop();

    return isDesktop ? <Navigate to="/" replace /> : <MobileUsersView />;
}