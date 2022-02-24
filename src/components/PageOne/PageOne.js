import React, {useState, useEffect} from 'react';
import { Breadcrumbs } from '@mui/material';
import { Routes, Route, Link as RouteLink, Outlet, useNavigate } from 'react-router-dom';
import { Link, Box, Chip } from '@mui/material';
import { getPosts } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../store/actions/storeRoute';

const PageOne = () => {

    const routes = useSelector(state => state.routes.postRoutes);
    const dispatch = useDispatch();

    const [intNav, setIntNav] = useState(routes);


    let posts = getPosts();
    const navigation = useNavigate();

    useEffect(() => {
        console.log('Store:', routes)
        
    }, []);

    const handleDelete = (item) => {
        setIntNav(intNav.filter(crumb => crumb.name !== item.name));
        dispatch(remove(intNav.filter(crumb=>crumb.name != item.name)));
    }

    return (
        <div>
            <header>
                {intNav.length>1&&(
                    <Box sx={{
                        backgroundColor: 'white',
                        paddingY: '12px',
                        paddingX: '50px',
                        textAlign: 'left',
                        borderBottom: '1px solid #999'
                    }} >
                        {intNav.map((item)=>(
                            <Chip sx={{marginX: '5px'}} color={'primary'} label={item.name} onClick={(e)=>e.prventDefault} component={RouteLink} to={item.url} onDelete={()=>handleDelete(item)} />
                        ))}
                    </Box>
                )}
                
                <Box sx={{
                    backgroundColor: 'white',
                    paddingY: '12px',
                    paddingX: '50px',
                    textAlign: 'left',
                }} >
                    <Breadcrumbs>
                       {intNav.map((item)=>(
                        //    <Link component={RouteLink} to={item.url} key={item.url} >
                           <p> {item.name}</p>
                        //    </Link>
                       ))}
                    </Breadcrumbs>
                </Box>
            </header>
            <h1>Posts</h1>
            <nav>
                {posts.map((post)=>(
                    <Link 
                        component={RouteLink} 
                        sx={{paddingX: '12px'}} 
                        to={`/page-one/${post.id}`} 
                        key={post.id} 
                        onClick={()=>{
                            if(intNav.filter(e => e.name === post.title).length < 1){
                                setIntNav(oldArray=>[...oldArray, {name: post.title, url: `/page-one/${post.id}`}])
                                dispatch(add(oldArray=>[...oldArray, { name: post.title, url: `/page-one/${post.id}`}]))
                            }
                        }}
                    >
                        {post.title}
                    </Link>
                ))}
            </nav>
            <Outlet />
        </div>
    );
}

export default PageOne;