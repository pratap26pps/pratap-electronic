"use client"

export default  function ErrorBoundary({error}){
    return (
        <div>
            error in   {error.message}
        </div>
    )
}