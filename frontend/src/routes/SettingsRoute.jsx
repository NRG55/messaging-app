import { Navigate } from 'react-router';
import { useIsDesktop } from '../hooks/useIsDesktop';
import MobileSettingsView from '../features/user/components/MobileSettingsView';

export default function SettingsRoute() {
    const isDesktop = useIsDesktop();

    return isDesktop ? <Navigate to="/" replace /> : <MobileSettingsView />;
}