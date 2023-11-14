export default function ContactsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="border-4 border-solid border-green-200">
                {children}
            </div>
        </>
    )
}