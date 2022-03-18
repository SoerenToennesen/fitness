
interface MyHeader {
    field: string,
    dataField: string,
    sortDirection: boolean,
}
interface MyHeaders extends Array<MyHeader>{}

export interface MyTable {
    title: string,
    addTitle: string,
    filter: string,
    headers: MyHeaders,
    sortField: string,
    dataLoaded: boolean,
    data: [],
    createOrUpdate: string,

    sortDirection: boolean,
}
