import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export function Layout() {
    return (
        <div className="min-h-screen bg-background text-foreground relative flex flex-col">
            {/* Global Background Gradient for the Liquid feel */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(219,234,254,0.3)_0%,_rgba(255,255,255,1)_80%)] -z-50 pointer-events-none" />

            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
