export function getTotalAmounts(groupedByData) {
    return Object.keys(groupedByData).map(item => {
        const totalValue = groupedByData[item].reduce((acc, curr) => acc + Number(curr.amount), 0)
        return totalValue
    })
} 

export function getAverageAmount(groupedByData) {
    return Object.keys(groupedByData).map(item => {
        const totalValue = groupedByData[item].reduce((acc, curr) => acc + Number(curr.amount), 0)
        return totalValue / groupedByData[item].length
    })
}