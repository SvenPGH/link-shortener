export default function NotFound() {
    return (
        <div className={"grid place-items-center gap-4 row-start-2 w-full max-w-4xl mx-auto px-4 pt-20 sm:pt-24 text-center"}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.2rem' }}>Oops! Looks like the page you were searching for doesn&#39;t exist.</p>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2rem' }}>It might have been moved, deleted, or perhaps you mistyped the URL.</p>
        </div>
    );
}