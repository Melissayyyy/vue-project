import instance from "@/request/http";

//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数
interface ReqLogin {
    studentno: string
    password: string
}

interface ReqRegister { //注册用户的表单
    username: string
    password: string
    studentno: string
    first_name: string,
    last_name: string,
    email: string,
    role: string
}

interface ReqStatus {
    id: string
    navStatus: string
}

interface NewBookForm{ //新录入的书的表单信息
    title: string,
    version: number,
    author: string,
    category: string,
    time: number,
}
interface BS_form{
    bid: number
    databorrow: string
    datareturn: string
}


// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;
// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
    success: string | null // 返回状态码的信息，如请求成功等;
    result: T,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    message:string
    code: number //返回后端自定义的200，404，500这种状态码
    user: User
    users: User[]
    total_users: number
    book: Book
    books: Book[]
    total_books: number
    total_pages: number
    category_list: Category[];
    bs: BS;
}

interface User {
    id: number,
    username: string,
    role: string,
    email: string,
    first_name: string,
    last_name: string,
    is_active: boolean,
    studentno: string,
}
interface Book {
    bid: number
    title: string
    author: string
    category: string
    status: number
    borrowedCnt: number
    version: number
    time: number  //入库年份
    is_active: boolean
}
interface BS{
    bid: number
    id: number
    databorrow: string
    datareturn: string
    expired: boolean
}

interface Category{
    whatstring: string
}

//测试hello api
export const TestHello = (): Res<null> =>
    instance.get('/api/hello');

//登录 api
export const LoginApi = (data: ReqLogin): Res<null> =>
    instance.post('/api/login', data);

//注册 api
export const RegisterApi = (data: ReqRegister): Res<null> =>
    instance.post('/api/register', data);

export const AddBook = (data: NewBookForm ):Res<null> =>
    instance.post('/api/addabook', data);



//登出 api
export const LogoutApi = (): Res<null> =>
    instance.get('/api/logout');

//根据username查询用户信息api  get
export const GetUserInfoByUserName = (params: { userName: string }): Res<null> =>
    instance.get(`/api/find/${params.userName}`, {params});

//根据pageNumber查询用户信息api  get
export const GetUserInfoByPageNum = (params: { pageNumber: number }): Res<null> =>
    instance.get(`/api/users/list/${params.pageNumber}`, {params});

export const AddUser = (): Res<null> =>
    instance.post('/api/adduser');

export const GetBookInfoByPageNum = (params: { pageNumber: number }): Res<null> =>
    instance.get(`/api/books/list/${params.pageNumber}`, {params});

export const GetCategories = (): Res<null> =>
    instance.get('/api/findbook/categories');

export const DiscardBookById = (params: { bookid: number }): Res<null> =>
    instance.get(`/api/delete/books/${params.bookid}`, {params});

export const BorrowABook = (data: BS_form): Res<null> =>
    instance.post('/api/borrowbook', data);


// //以下是模板:
// // post请求 ，没参数
// export const LogoutAPI = (): Res<null> =>
//     instance.post("/admin/logout");

// // post请求，有参数,如传用户名和密码
// export const loginAPI = (data: ReqLogin): Res<string> =>
//     instance.post("/admin/login", data);

// // post请求 ，没参数，但要路径传参
// export const StatusAPI = (data: ReqStatus): Res<null> =>
//     instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`);


// //  get请求，没参数，
// export const FlashSessionListApi = (): Res<null> =>
//     instance.get("/flashSession/list");

// // get请求，有参数，路径也要传参  (也可能直接在这写类型，不过不建议,大点的项目会维护一麻烦)
// export const ProductCategoryApi = (params: { parentId: number }): any =>
//     instance.get(`/productCategory/list/${params.parentId}`, {params});

// // get请求，有参数，(如果你不会写类型也可以使用any,不过不建议,因为用了之后 和没写TS一样)
// export const AdminListAPI = (params: any): any =>
//     instance.get("/admin/list", {params});
