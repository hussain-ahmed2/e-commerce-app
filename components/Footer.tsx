export default function Footer() {
    return (
        <footer className="border-t py-3 bg-neutral-800 text-white">
            <nav className="container mx-auto max-w-7xl">
                <p className="text-center">&copy; {new Date().getFullYear()} My Store</p>
            </nav>
        </footer>
    );
}