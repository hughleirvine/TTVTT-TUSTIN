import Link from 'next/link';

export function Footer() {
    return (
        <footer className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="text-sm">
                <Link
                    href="/"
                    className="decoration-dashed text-primary underline-offset-8"
                >
                    BAN THỪA TÁC VIÊN THÁNH THỂ TUSTIN NHIỆM KỲ 2025 - 2027
                </Link>
            </p>
        </footer>
    );
}
