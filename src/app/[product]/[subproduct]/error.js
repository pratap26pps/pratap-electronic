"use client"

export default  function ErrorBoundary({error}){
    return (
        <div>
            error in reviewid {error.message}
        </div>
    )
}