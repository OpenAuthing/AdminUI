import { cn } from '@/lib/utils';

export const LogoIcon = ({
    fill,
    className,
}: {
    fill?: string;
    className?: string;
}) => {
    return (
        <svg className={cn('', className)} viewBox="0 0 80 80">
            <g
                transform="matrix(0.808164727123819,0,0,0.808164727123819,0,0)"
                fill={fill}
            >
                <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,37.4c-3.8,0-6.9,3.1-7,6.9h0v2.5h14v-2.5h0C56.9,40.4,53.8,37.4,50,37.4z"></path>
                    <path d="M50,5c0,0-20,17.6-40.1,17.6c0,17.3,0.1,34.2,7.5,47.3C25,83.3,39.8,92.7,50,95c10.1-2.6,24.3-12.1,31.8-25.2   c7.5-13.1,8.3-29.8,8.3-47.2C70,22.6,50,5,50,5z M62,63.4c0,1.2-1,2.3-2.3,2.3H40.3c-1.2,0-2.3-1-2.3-2.3V46.8h2v-2.5h0   c0.1-5.5,4.5-9.9,10-9.9s9.9,4.4,10,9.9h0v2.5h2V63.4z"></path>
                </g>
            </g>
        </svg>
    );
};

export const LogoText = ({
    fill,
    className,
}: {
    fill?: string;
    className?: string;
}) => {
    return (
        <svg className={cn('text-center', className)} viewBox="0 0 290 60">
            <defs id="SvgjsDefs2513"></defs>
            <g
                transform="matrix(2.416823603264281,0,0,2.416823603264281,0,0)"
                fill={fill}
            >
                <path d="M7.78 20.28 c-4 0 -7.26 -3.06 -7.26 -7.12 c0 -4.08 3.26 -7.14 7.26 -7.14 c4.1 0 7.26 3.06 7.26 7.12 c0 4.08 -3.16 7.14 -7.26 7.14 z M7.78 17.4 c2.32 0 4.1 -1.84 4.1 -4.26 c0 -2.38 -1.78 -4.24 -4.1 -4.24 s-4.1 1.86 -4.1 4.26 s1.78 4.24 4.1 4.24 z M21.66 12.16 c-1.6 0 -2.8 1.22 -2.8 2.76 c0 1.52 1.24 2.76 2.8 2.76 c1.52 0 2.7 -1.24 2.7 -2.76 c0 -1.54 -1.18 -2.76 -2.7 -2.76 z M21.9 20.14 c-1.16 0 -2.28 -0.36 -3 -0.92 l0 4.3 l-2.78 0 l0 -13.78 l2.78 0 l0 0.8 c0.72 -0.56 1.84 -0.9 3 -0.9 c2.8 0 5.18 2.26 5.18 5.22 s-2.38 5.28 -5.18 5.28 z M38.1 17.8 c-1 1.5 -2.58 2.44 -4.86 2.44 c-3.28 0 -5.4 -2.3 -5.4 -5.34 c0 -2.96 2.2 -5.36 5.42 -5.36 c3.24 0 5.2 2.24 5.2 5.22 c0 0.4 -0.04 0.92 -0.04 0.98 l-7.84 0 c0.3 1.3 1.28 2.14 2.72 2.14 c1.24 0 2.14 -0.54 2.72 -1.36 z M33.24 11.82 c-1.3 0 -2.2 0.7 -2.56 1.86 l4.98 0 c-0.3 -1.24 -1.3 -1.86 -2.42 -1.86 z M42.16 9.74 l0 1.04 c0.5 -0.58 1.56 -1.22 2.98 -1.22 c2.4 0 3.96 1.66 3.96 4.14 l0 6.3 l-2.76 0 l0 -5.82 c0 -1.22 -0.7 -2.06 -1.88 -2.06 c-1.36 0 -2.26 0.86 -2.26 2.28 l0 5.6 l-2.78 0 l0 -10.26 l2.74 0 z M58.199999999999996 14.9 l-1.78 -5.36 l-1.78 5.36 l3.56 0 z M59.9 20 l-0.78 -2.36 l-5.38 0 l-0.78 2.36 l-3.18 0 l4.84 -13.7 l3.8 0 l4.82 13.7 l-3.34 0 z M73.6 20 l-2.74 0 l0 -1.02 c-0.7 0.74 -1.74 1.2 -2.98 1.2 c-2.4 0 -3.96 -1.66 -3.96 -4.14 l0 -6.3 l2.76 0 l0 5.82 c0 1.22 0.7 2.06 1.9 2.06 c1.34 0 2.26 -0.86 2.26 -2.28 l0 -5.6 l2.76 0 l0 10.26 z M78.82 9.74 l2.52 0 l0 2.48 l-2.52 0 l0 4.12 c0 0.92 0.42 1.28 1.36 1.28 l1.16 0 l0 2.38 l-1.36 0 c-2.72 0 -3.94 -1.22 -3.94 -3.52 l0 -4.26 l-1.48 0 l0 -2.48 l1.48 0 l0 -2.64 l2.78 0 l0 2.64 z M85.16 6.300000000000001 l0 4.48 c0.4 -0.52 1.5 -1.22 2.94 -1.22 c2.4 0 3.96 1.66 3.96 4.14 l0 6.3 l-2.76 0 l0 -5.82 c0 -1.22 -0.7 -2.06 -1.88 -2.06 c-1.36 0 -2.26 0.86 -2.26 2.28 l0 5.6 l-2.78 0 l0 -13.7 l2.78 0 z M95.96 8.86 l-2.78 0 l0 -2.56 l2.78 0 l0 2.56 z M95.96 20 l-2.78 0 l0 -10.26 l2.78 0 l0 10.26 z M99.82 9.74 l0 1.04 c0.5 -0.58 1.56 -1.22 2.98 -1.22 c2.4 0 3.96 1.66 3.96 4.14 l0 6.3 l-2.76 0 l0 -5.82 c0 -1.22 -0.7 -2.06 -1.88 -2.06 c-1.36 0 -2.26 0.86 -2.26 2.28 l0 5.6 l-2.78 0 l0 -10.26 l2.74 0 z M113.03999999999999 12.08 c-1.46 0 -2.64 1.22 -2.64 2.7 c0 1.52 1.18 2.7 2.64 2.7 c1.58 0 2.76 -1.18 2.76 -2.7 c0 -1.48 -1.2 -2.7 -2.76 -2.7 z M113.02 23.759999999999998 c-2.3 0 -3.9 -0.88 -4.96 -2.4 l2 -1.36 c0.62 0.86 1.6 1.42 2.92 1.42 c1.72 0 2.78 -0.72 2.78 -2.18 l0 -0.28 c-0.74 0.62 -1.76 0.94 -2.96 0.94 c-2.74 0 -5.1 -2.22 -5.1 -5.14 c0 -2.9 2.36 -5.18 5.1 -5.18 c1.36 0 2.36 0.44 2.96 0.92 l0 -0.76 l2.76 0 l0 9.26 c0 2.64 -1.96 4.76 -5.5 4.76 z"></path>
            </g>
        </svg>
    );
};

export default () => {
    return (
        <div className="flex items-center gap-x-1">
            <LogoIcon fill="#2563eb" className="w-8 h-8" />
            <LogoText fill="#2563eb" className="flex-1" />
        </div>
    );
};
