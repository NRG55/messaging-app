import { useIsDesktop } from '../../../hooks/useIsDesktop';
import DesktopHomeView from './DesktopHomeView';
import MobileChatsView from './MobileChatsView';

export default function HomeView() {
    const isDesktop = useIsDesktop();

    return isDesktop ? <DesktopHomeView /> : <MobileChatsView />;
}