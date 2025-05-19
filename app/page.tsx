export default function Home() {
    const SendIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M5 4L15 10L5 16V4Z" />
        </svg>
    );

    return (
        <>
            <h1 className="text-2xl font-bold text-black dark:text-white">SVP.GL</h1>
            <div className="relative flex items-center w-full max-w-2xl">
                <input
                    type="url"
                    className="w-full p-3 pr-12 border border-gray-800 dark:border-gray-600 rounded-2xl placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500 focus:border-transparent shadow-sm hover:shadow-md transition-colors transition-shadow duration-300 ease-in-out"
                    placeholder="Travel to Link here"
                />
                <button
                    type="button"
                    aria-label="Send URL"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-9 h-9
                       bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800
                       border border-gray-700 dark:border-gray-300 rounded-full
                       hover:bg-gray-700 dark:hover:bg-gray-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:focus:ring-offset-white
                       transition-colors duration-300 ease-in-out"
                >
                <SendIcon />
                </button>
            </div>
        </>
    );
}