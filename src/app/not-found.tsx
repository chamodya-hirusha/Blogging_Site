import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container py-20 text-center">
            <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
            <p className="text-xl text-foreground mb-2">Page not found</p>
            <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
            <Link href="/" className="inline-block px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                Go Home
            </Link>
        </div>
    );
}
