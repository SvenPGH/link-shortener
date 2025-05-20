interface ChevronDownIconProps {
    isOpen: boolean;
    className?: string;
}

export default function ChevronDownIcon({isOpen, className = 'w-3 h-3'}: ChevronDownIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${className} transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-270' : 'rotate-90'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
};