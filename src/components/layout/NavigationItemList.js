import Link from 'next/link';

export default function NavigationItemList({ children, href }) {
    return (
        <li className="inline-block">
            <Link
                className="inline-block px-3 py-5 
                                relative transition-all after:content-[''] after:w-full after:h-1 after:bg-sky-600 after:absolute after:bottom-0 after:left-0 after:opacity-0 after:transition-all
                                after:translate-y-full hover:after:opacity-100 hover:after:translate-y-0"
                href={href}>
                {children}
            </Link>
        </li>
    );

}