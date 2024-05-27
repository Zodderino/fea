export function groupByKey(array, key) {
    const map = new Map()

    array.forEach(item => {
        if (!map.has(item[key])) {
            map.set(item[key], [item])
            return;
        }

        const mapItem = map.get(item[key])
        map.set(item[key], [...mapItem, item])
    })

    return Object.fromEntries(map)
}