

const useFormatDate = () => {

     const basicFormat = (dateString) => {
        const date = new Date(dateString)
        const today = new Date()
        if (date.getFullYear() === today.getFullYear() && 
        date.getMonth() === today.getMonth() && today.getDate() - date.getDate() < 7) {
            if (date.getDate() === today.getDate())
                return date.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric', hour12: true })
            else if (today.getDate() - date.getDate() === 1) 
                return 'yesterday'
            else {
                return date.toLocaleDateString(undefined, { weekday: 'long' })
            }
        }else {
            return date.toLocaleDateString()
        }
    }
    return {basicFormat}
}


export default useFormatDate