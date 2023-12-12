type QueryParamValueTypes = Array<string> | number

export const buildQueryString = (queryParams: Record<string, QueryParamValueTypes>) => {
    const wikiString = `wiki=${encodeURIComponent(
        queryParams.wiki.toString().replaceAll(",", "|")
    )}`
    const conditionString = `conditions=${encodeURIComponent(
        queryParams.conditions.toString().replaceAll(",", " AND ")
    )}`
    const datapointString = `query=${encodeURIComponent(queryParams.query.toString())}`

    const fullString = `${wikiString}&${conditionString}&${datapointString}&limit=${queryParams.limit}`

    return fullString
}
