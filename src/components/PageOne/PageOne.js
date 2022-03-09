import React, {useState, useEffect} from 'react';
import { Breadcrumbs } from '@mui/material';
// import { Routes, Route, Link as RouteLink, Outlet, useNavigate } from 'react-router-dom';
import { Link, Box, Chip } from '@mui/material';
import { getPosts } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { addRoute, removeRoute } from '../../redux/routes/routes.actions';

const PageOne = ({feature}) => {

    const routes = useSelector(state => state.routes.postRoutes);
    const dispatch = useDispatch();

    const [intNav, setIntNav] = useState(routes);


    let posts = getPosts();

    // useEffect(() => {
    //     if (routes.length < 2) {
    //         if(routes.filter(e=>e.name === 'Page One').length < 1) {
    //             dispatch(addRoute({name: 'Page One', url: '/page-one'}));
    //         }
    //     }
    //     console.log('Store:', routes)
    //     console.log('Feature 2:', feature)
        
    // }, []);

    const handleDelete = (item) => {
        dispatch(removeRoute(item));
    }

    

    return (
        <div>
            <header>
                {/* {routes.length>1&&(
                    <Box sx={{
                        backgroundColor: 'white',
                        paddingY: '12px',
                        paddingX: '50px',
                        textAlign: 'left',
                        borderBottom: '1px solid #999'
                    }} >
                        {routes.map((item)=>(
                            <Chip key={item.name} sx={{marginX: '5px', marginY: '5px'}} color={'primary'} label={item.name} onClick={(e)=>e.prventDefault} component={RouteLink} to={item.url} onDelete={()=>handleDelete(item)} />
                        ))}
                    </Box>
                )} */}
                
                <Box sx={{
                    backgroundColor: 'white',
                    paddingY: '12px',
                    paddingX: '50px',
                    textAlign: 'left',
                }} >
                    <Breadcrumbs>
                       {routes.map((item)=>(
                        //    <Link component={RouteLink} to={item.url} key={item.url} >
                           <p key={item.name}> {item.name}</p>
                        //    </Link>
                       ))}
                    </Breadcrumbs>
                </Box>
            </header>
            {/* <h1>Posts</h1>
            <nav>
                {posts.map((post)=>(
                    <Link 
                        component={RouteLink} 
                        sx={{paddingX: '12px'}} 
                        to={`/page-one/${post.id}`} 
                        key={post.id} 
                        onClick={()=>{
                            if(routes.filter(e => e.name === post.title).length < 1){
                                dispatch(addRoute({name: post.title, url: `/page-one/${post.id}`}))
                                console.log('Updated Routes', routes);
                            }
                        }}
                    >
                        {post.title}
                    </Link>
                ))}
            </nav> */}
            {/* <Outlet /> */}
        </div>
    );
}

export default PageOne;