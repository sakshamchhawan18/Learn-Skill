import Image from "next/image";

declare module 'react' {
    interface JSX {
        // Add the missing interface 'JSX.IntrinsicElements'
        // to resolve the issue with JSX element implicitly having type 'any'.
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                        <h1>Work in progress from notes</h1>
        </main>
    );
}
