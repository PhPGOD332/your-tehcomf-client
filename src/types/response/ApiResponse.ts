export interface ApiResponse<DataT> {
    status: string;
    data: DataT;
}