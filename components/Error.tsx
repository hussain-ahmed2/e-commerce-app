export default function Error({ message }: { message: string }) {
    return <div className="py-8">
        <p className="text-center text-rose-600 font-medium">{message}</p>
    </div>
}