export {}

declare global{
    namespace Express{
        interface Response{
            status: any
        }
    }
}