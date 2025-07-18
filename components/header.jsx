import Image from 'next/image';
import Link from 'next/link';
import ttvttLogo from 'public/ttvtt-logo.png';
import githubLogo from 'public/images/github-mark-white.svg';

const navItems = [

    { linkText: 'Home', href: '/' },
    { linkText: 'Thông Báo', href: '/announcements' },
    { linkText: 'Lịch Trình', href: '/schedule' },
    { linkText: 'Hiệp Thông', href: '/bulletins' },
    { linkText: 'Lịch Công Giáo', href: '/lich-cong-giao' }
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={ttvttLogo} alt="TTVTT logo" width={150} height={50}/>
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2">
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
