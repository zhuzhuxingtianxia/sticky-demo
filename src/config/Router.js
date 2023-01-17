import React from 'react';
import { Route, Routes} from 'react-router-dom';
import loadable from "@loadable/component";

import NoMatch from "@com/error/index";
import Loading from '@com/loading/index';

const Home = loadable(() => import('@pages/home/index'),{
    fallback:<Loading />
});
const Detail = loadable(() => import('@pages/detail/index'),{
    fallback:<Loading />
});

const StickyPage = loadable(() => import('@pages/stickyPage/index'),{
    fallback:<Loading />
});

const Lottery = loadable(() => import('@pages/lottery/index'),{
    fallback:<Loading />
});



const Router = (props) => {
    // debugger
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/detail" element={<Detail/>}/>
            {/* restful格式传参数 */}
            <Route path="/detail/:title" element={<Detail/>}/>
            <Route path="/stickyPage" element={<StickyPage/>}/>
            <Route path="/lottery" element={<Lottery/>}/>
            <Route element={<NoMatch />}/>
        </Routes>
    )
};

export default Router;