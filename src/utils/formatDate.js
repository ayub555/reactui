// converts a "yyyy-mm-dd" date string to "dd-mm-yyyy"
function formatDate(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export default formatDate
